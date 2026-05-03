#!/usr/bin/env python3
"""
Convert Faect factsheet HTML files → Sanity Portable Text → patch app documents.

Skips: title (h1), tagline (s2 class), logo image, "Faectsheet" label (s1 class).
Section headings (s3/s4 + span.h2) become h2 blocks — emojis stripped (icons added in renderer).
Feature items (h3 + p inside li) become h3 + normal blocks.
Bullet list items become bullet list blocks.
Benefit lines (✔ ...) become normal blocks.
Links are preserved as Portable Text link annotations.
"""

import re
import json
import os
import uuid
import urllib.request
import urllib.error
from html.parser import HTMLParser

# ── Config ────────────────────────────────────────────────────────────────────

SANITY_PROJECT = 'ymgfr312'
SANITY_DATASET  = 'faect'
SANITY_API_VER  = '2024-01-01'

with open(os.path.expanduser('~/.config/sanity/config.json')) as f:
    SANITY_TOKEN = json.load(f)['authToken']

HTML_DIR = '/Users/cmhelderxs4all.nl/Library/Mobile Documents/com~apple~CloudDocs/werk/Faect_2025/apps/white-papers/2026/apps-pdf'

FILE_TO_SLUG = {
    'Faectsheet-Complementary-FieldsDynamicRoleCenter.html': 'complementary-fields-dynamic-rolecenter',
    'Faectsheet-Configurator.html':                          'configurator',
    'Faectsheet-DataExchangeExtension.html':                 'data-exchange-extension',
    'Faectsheet-DirectPaymentInt.html':                      'direct-payment-integration',
    'Faectsheet-DocumentProcessManagement.html':             'document-process-management',
    'Faectsheet-MultiFinance.html':                          'multi-finance',
    'Faectsheet-ProcessFlow.html':                           'process-flow',
    'Faectsheet-Profit_PricingPromotions.html':              'profit-pricing-promotions',
    'Faectsheet-TransportPlanning.html':                     'transport-planning',
}

# ── Portable Text helpers ─────────────────────────────────────────────────────

def k():
    return uuid.uuid4().hex[:12]

def span(text, marks=None):
    return {'_type': 'span', '_key': k(), 'text': text, 'marks': marks or []}

def block(children, style='normal', list_item=None, mark_defs=None):
    b = {
        '_type':    'block',
        '_key':     k(),
        'style':    style,
        'markDefs': mark_defs or [],
        'children': children,
    }
    if list_item:
        b['listItem'] = list_item
        b['level']    = 1
    return b

def text_block(text, style='normal', list_item=None):
    return block([span(text)], style=style, list_item=list_item)

def link_block(parts):
    """parts: list of (text, href_or_None)"""
    children, mark_defs = [], []
    for text, href in parts:
        if href:
            lk = k()
            mark_defs.append({'_type': 'link', '_key': lk, 'href': href})
            children.append(span(text, marks=[lk]))
        else:
            if text:
                children.append(span(text))
    return block(children, mark_defs=mark_defs) if children else None

# ── HTML → Portable Text parser ───────────────────────────────────────────────

class FactsheetParser(HTMLParser):
    """
    State machine that converts factsheet HTML to Portable Text blocks.

    States
    ------
    idle          – between meaningful elements
    skip          – inside a tag to ignore (h1, s1, s2, img, br)
    section_head  – inside <p class="s3/s4"> collecting heading text
    intro_p       – inside a regular intro <p>
    in_h3         – inside <h3> (feature title)
    in_li_p       – inside <li><p> (bullet or feature description)
    benefit       – inside <p class="s5/s7"> (✔ benefit lines)
    avail_li      – inside availability <ul id="l2"> list items
    cta_p         – inside Call-to-Action paragraphs (may contain links)
    """

    def __init__(self):
        super().__init__()
        self.blocks      = []
        self._text       = []        # current text buffer
        self._state      = 'idle'
        self._in_ul      = 0         # nesting counter for <ul>
        self._in_li      = False
        self._past_intro = False     # True once we've seen first section heading
        self._past_cta   = False     # True once we've seen CTA heading
        self._links      = []        # (text_so_far, href) pairs for link_block
        self._cur_href   = None

    # ── helpers ──

    def _flush(self, style='normal', list_item=None):
        txt = ''.join(self._text).strip()
        self._text = []
        return txt

    def _add(self, b):
        if b:
            self.blocks.append(b)

    def _clean(self, txt):
        """Strip emojis, bullets, excess whitespace."""
        # Remove emoji (common ones from these files)
        txt = re.sub(r'[⭐🔑📊🖥🚀✔•]\s*', '', txt)
        return re.sub(r'\s+', ' ', txt).strip()

    # ── HTMLParser callbacks ──

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        cls   = attrs.get('class', '')
        id_   = attrs.get('id', '')

        # ── tags to skip entirely ──
        if tag in ('img', 'style', 'head'):
            self._state = 'skip'
            return

        if tag == 'h1':
            self._state = 'skip'
            return

        if tag == 'p' and cls == 's1':   # "Faectsheet" label
            self._state = 'skip'
            return

        if tag == 'p' and cls == 's2':   # subtitle / tagline
            self._state = 'skip'
            return

        # ── section headings ──
        if tag == 'p' and cls in ('s3', 's4'):
            self._state = 'section_head'
            self._text  = []
            return

        # ── benefit lines (✔ items) ──
        if tag == 'p' and cls in ('s5', 's6', 's7'):
            self._state = 'benefit'
            self._text  = []
            return

        # ── CTA paragraphs (after last h2) ──
        if self._past_cta and tag == 'p':
            self._state = 'cta_p'
            self._text  = []
            self._links = []
            return

        # ── intro paragraphs (before first section heading) ──
        if not self._past_intro and tag == 'p':
            self._state = 'intro_p'
            self._text  = []
            return

        # ── ul / li ──
        if tag == 'ul':
            self._in_ul += 1
            return

        if tag == 'li' and self._in_ul:
            self._in_li = True
            self._text  = []
            return

        # ── feature title ──
        if tag == 'h3':
            self._state = 'in_h3'
            self._text  = []
            return

        # ── paragraph inside list item ──
        if tag == 'p' and self._in_li:
            self._state = 'in_li_p'
            self._text  = []
            return

        # ── links (inside cta_p or intro_p) ──
        if tag == 'a':
            if self._state in ('cta_p', 'intro_p'):
                href = attrs.get('href', '')
                # Save text collected so far as plain part
                self._links.append((''.join(self._text).strip(), None))
                self._text     = []
                self._cur_href = href
            return

        # ── span.h2 (heading text inside s3/s4) ──
        # Just continue collecting text — state already 'section_head'

    def handle_endtag(self, tag):
        if tag in ('img', 'style', 'head'):
            self._state = 'idle'
            return

        if tag == 'h1':
            self._state = 'idle'
            self._text  = []
            return

        if tag == 'ul':
            self._in_ul = max(0, self._in_ul - 1)
            return

        if tag == 'li':
            self._in_li = False
            self._state = 'idle'
            self._text  = []
            return

        if tag == 'a' and self._cur_href:
            link_text      = ''.join(self._text).strip()
            self._links.append((link_text, self._cur_href))
            self._text     = []
            self._cur_href = None
            return

        if tag == 'h3' and self._state == 'in_h3':
            txt = self._flush()
            if txt:
                self._add(text_block(txt, style='h3'))
            self._state = 'idle'
            return

        if tag == 'p':
            state = self._state

            if state == 'skip':
                self._state = 'idle'
                self._text  = []
                return

            if state == 'section_head':
                # Extract text, strip emoji prefix
                raw = ''.join(self._text).strip()
                txt = self._clean(raw)
                # Detect CTA heading to switch state
                if 'Call-to-Action' in txt or 'Call to Action' in txt:
                    self._past_cta = True
                if txt:
                    self._add(text_block(txt, style='h2'))
                self._past_intro = True
                self._state = 'idle'
                self._text  = []
                return

            if state == 'intro_p':
                txt = ''.join(self._text).strip()
                txt = re.sub(r'\s+', ' ', txt)
                if txt and txt not in ('\xa0', ''):
                    # Check for link
                    if self._links or self._cur_href:
                        self._links.append((txt, None))
                        b = link_block(self._links)
                        self._add(b)
                        self._links = []
                    else:
                        self._add(text_block(txt))
                self._state = 'idle'
                self._text  = []
                return

            if state == 'benefit':
                raw = ''.join(self._text).strip()
                raw = re.sub(r'\s+', ' ', raw)
                # Strip leading ✔ and bullet chars
                txt = re.sub(r'^[✔•]\s*', '', raw).strip()
                if txt:
                    self._add(text_block('✔ ' + txt))
                self._state = 'idle'
                self._text  = []
                return

            if state == 'in_li_p':
                txt = re.sub(r'\s+', ' ', ''.join(self._text)).strip()
                txt = re.sub(r'^•\s*', '', txt)  # strip PDF bullet artifact
                if txt:
                    self._add(text_block(txt, list_item='bullet'))
                self._state = 'idle'
                self._text  = []
                return

            if state == 'cta_p':
                remaining = ''.join(self._text).strip()
                if self._links or remaining:
                    all_parts = self._links + ([(remaining, None)] if remaining else [])
                    if any(href for _, href in all_parts):
                        b = link_block(all_parts)
                        self._add(b)
                    else:
                        txt = ''.join(t for t, _ in all_parts).strip()
                        txt = re.sub(r'\s+', ' ', txt)
                        if txt:
                            self._add(text_block(txt))
                self._links = []
                self._state = 'idle'
                self._text  = []
                return

            # Default: discard
            self._state = 'idle'
            self._text  = []

    def handle_data(self, data):
        if self._state not in ('idle', 'skip'):
            self._text.append(data)


def parse_html(html_content):
    p = FactsheetParser()
    p.feed(html_content)
    # Filter empty/whitespace-only blocks
    return [
        b for b in p.blocks
        if any(c.get('text', '').strip() for c in b.get('children', []))
    ]

# ── Sanity API helpers ────────────────────────────────────────────────────────

def sanity_request(method, path, body=None):
    url     = f'https://ymgfr312.api.sanity.io/v{SANITY_API_VER}/{path}'
    data    = json.dumps(body).encode() if body else None
    headers = {
        'Authorization': f'Bearer {SANITY_TOKEN}',
        'Content-Type':  'application/json',
    }
    req  = urllib.request.Request(url, data=data, headers=headers, method=method)
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())

def find_doc_id(slug):
    query  = f'*[_type == "app" && slug.current == "{slug}" && !(_id in path("drafts.**"))][0]._id'
    result = sanity_request('GET', f'data/query/{SANITY_DATASET}?query={urllib.parse.quote(query)}')
    return result.get('result')

def patch_body(doc_id, body_blocks):
    mutations = [{'patch': {'id': doc_id, 'set': {'body': body_blocks}}}]
    return sanity_request('POST', f'data/mutate/{SANITY_DATASET}', {'mutations': mutations})

def publish_doc(doc_id):
    actions = [{'actionType': 'sanity.action.document.publish', 'draftId': f'drafts.{doc_id}', 'publishedId': doc_id}]
    return sanity_request('POST', f'data/actions/{SANITY_DATASET}', {'actions': actions})

# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    for filename, slug in FILE_TO_SLUG.items():
        path = os.path.join(HTML_DIR, filename)
        if not os.path.exists(path):
            print(f'  ✗ File not found: {filename}')
            continue

        print(f'\n── {slug} ──')

        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            html = f.read()

        blocks = parse_html(html)
        print(f'  → {len(blocks)} blocks parsed')

        doc_id = find_doc_id(slug)
        if not doc_id:
            print(f'  ✗ No published doc found for slug: {slug}')
            continue

        print(f'  → doc: {doc_id}')
        patch_body(doc_id, blocks)
        print(f'  ✓ draft saved')

    print('\nDone.')

if __name__ == '__main__':
    main()
