#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix "Voordelen" sections across all 9 app docs.

Blocks between the "Voordelen in één oogopslag" h2 and the "Beschikbaarheid" h2
that were incorrectly imported as h2 style are converted to normal blocks
with a ✔ prefix — matching the Complementary Fields reference.
"""

import json
import os
import uuid
import urllib.request
import urllib.parse

SANITY_PROJECT = 'ymgfr312'
SANITY_DATASET  = 'faect'
SANITY_API_VER  = '2024-01-01'

with open(os.path.expanduser('~/.config/sanity/config.json')) as f:
    SANITY_TOKEN = json.load(f)['authToken']

DOC_IDS = [
    'LKoX4P0z7W6obIGRbXKdqZ',  # complementary-fields-dynamic-rolecenter
    'YTJXK0pSg0Faj6IAyjWL8K',  # configurator
    'YTJXK0pSg0Faj6IAyjWTxM',  # data-exchange-extension
    'upgXMf8Hu0qZMbCw0ADZ0i',  # direct-payment-integration
    'upgXMf8Hu0qZMbCw0ADcli',  # document-process-management
    'LKoX4P0z7W6obIGRbXKj6l',  # multi-finance
    'YTJXK0pSg0Faj6IAyjWXvy',  # process-flow
    'upgXMf8Hu0qZMbCw0ADd8G',  # profit-pricing-promotions
    'upgXMf8Hu0qZMbCw0ADdg5',  # transport-planning
]

def k():
    return uuid.uuid4().hex[:12]

def block_text(block):
    return ''.join(c.get('text', '') for c in block.get('children', []))

def sanity_request(method, path, body=None):
    url     = f'https://{SANITY_PROJECT}.api.sanity.io/v{SANITY_API_VER}/{path}'
    data    = json.dumps(body).encode() if body else None
    headers = {'Authorization': f'Bearer {SANITY_TOKEN}', 'Content-Type': 'application/json'}
    req     = urllib.request.Request(url, data=data, headers=headers, method=method)
    resp    = urllib.request.urlopen(req)
    return json.loads(resp.read())

def fetch_body(doc_id):
    query  = f'*[_id == "{doc_id}"][0]{{ body }}'
    result = sanity_request('GET', f'data/query/{SANITY_DATASET}?query={urllib.parse.quote(query)}')
    return result.get('result', {}).get('body', [])

def patch_body(doc_id, body):
    mutations = [{'patch': {'id': doc_id, 'set': {'body': body}}}]
    return sanity_request('POST', f'data/mutate/{SANITY_DATASET}', {'mutations': mutations})

def to_voordeel_block(block):
    """Convert an h2 block to a normal ✔ block."""
    text = block_text(block)
    return {
        '_type':    'block',
        '_key':     k(),
        'style':    'normal',
        'listItem': None,
        'markDefs': [],
        'children': [
            {'_type': 'span', '_key': k(), 'text': f'✔ {text}', 'marks': []}
        ],
    }

def process_doc(doc_id):
    body = fetch_body(doc_id)
    if not body:
        print(f'  ✗ no body found')
        return

    # Find Voordelen and Beschikbaarheid h2 indices
    voordelen_idx    = None
    beschikbaar_idx  = None

    for i, block in enumerate(body):
        if block.get('style') == 'h2':
            txt = block_text(block)
            if 'Voordelen' in txt:
                voordelen_idx = i
            elif 'Beschikbaarheid' in txt and voordelen_idx is not None:
                beschikbaar_idx = i
                break

    if voordelen_idx is None:
        print(f'  – no "Voordelen" h2 found, skipping')
        return

    if beschikbaar_idx is None:
        print(f'  – no "Beschikbaarheid" h2 after Voordelen, skipping')
        return

    # Convert any h2 blocks between Voordelen and Beschikbaarheid
    new_body      = []
    patched_count = 0

    for i, block in enumerate(body):
        if voordelen_idx < i < beschikbaar_idx and block.get('style') == 'h2':
            new_body.append(to_voordeel_block(block))
            patched_count += 1
        else:
            new_body.append(block)

    if patched_count:
        patch_body(doc_id, new_body)
        print(f'  ✓ {patched_count} h2 blocks converted to ✔ normal blocks')
    else:
        print(f'  – already correct, nothing to fix')

def main():
    for doc_id in DOC_IDS:
        print(f'\n── {doc_id}')
        process_doc(doc_id)
    print('\nDone.')

if __name__ == '__main__':
    main()
