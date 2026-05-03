#!/usr/bin/env python3
"""
Patch "Beschikbaarheid" bullet items in all 9 app docs.
Splits "Label: value" text into a strong span + plain span.
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

def split_label_value(block):
    """Split 'Label: value' block into strong + plain children."""
    children = block.get('children', [])
    if not children:
        return block

    text = children[0].get('text', '')
    if ':' not in text:
        return block

    colon_idx = text.index(':')
    label     = text[:colon_idx]
    rest      = text[colon_idx:]  # includes the colon: ": value"

    return {
        **block,
        'markDefs': [],
        'children': [
            {'_type': 'span', '_key': k(), 'text': label, 'marks': ['strong']},
            {'_type': 'span', '_key': k(), 'text': rest,  'marks': []},
        ],
    }

def patch_body(doc_id, body):
    mutations = [{'patch': {'id': doc_id, 'set': {'body': body}}}]
    return sanity_request('POST', f'data/mutate/{SANITY_DATASET}', {'mutations': mutations})

def process_doc(doc_id):
    body = fetch_body(doc_id)
    if not body:
        print(f'  ✗ no body found')
        return

    new_body      = []
    in_beschik    = False
    patched_count = 0

    for block in body:
        style     = block.get('style', 'normal')
        list_item = block.get('listItem')

        # Detect "Beschikbaarheid" h2
        if style == 'h2':
            text = ''
            for child in block.get('children', []):
                text += child.get('text', '')
            in_beschik = 'Beschikbaarheid' in text

        # Patch bullet items inside "Beschikbaarheid"
        if in_beschik and list_item == 'bullet':
            new_body.append(split_label_value(block))
            patched_count += 1
        else:
            new_body.append(block)

    if patched_count:
        patch_body(doc_id, new_body)
        print(f'  ✓ {patched_count} blocks patched')
    else:
        print(f'  – nothing to patch')

def main():
    for doc_id in DOC_IDS:
        print(f'\n── {doc_id}')
        process_doc(doc_id)
    print('\nDone.')

if __name__ == '__main__':
    main()
