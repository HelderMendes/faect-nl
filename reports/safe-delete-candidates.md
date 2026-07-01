# Safe Delete Candidates (High Confidence)

Generated: 2026-07-01
Source: reports/asset-usage-report.md

This list is intentionally conservative. It excludes:

- Files with exact-path references
- Files with basename-only matches
- Config/build/runtime files from the repo-wide scan

## A) High-confidence disposable files

These are almost always safe to remove from version control if not intentionally used by your workflow:

- dist/index.html
- dist/static/create-manifest.json
- tsconfig.tsbuildinfo
- web/tsconfig.tsbuildinfo
- .fallow/cache.bin
- .fallow/graph-cache.bin
- scripts/.fallow/cache.bin
- web/.fallow/cache.bin

## B) Candidate public assets to review in batch

These appear unreferenced by exact path and basename in code, but could still be used in Sanity content. Delete only after Sanity spot-check.

Priority folder candidates:

- web/public/MicrosoftDynamics-365_BusinessCentral/\*\*
- web/public/nieuws/\*\*
- web/public/oplossingen/\*\*
- web/public/klanten-cases/\*\*
- web/public/partners/\*\*
- web/public/team/\*\*

## C) Keep / do not auto-delete

From repo-wide unused scan (false-positive prone):

- .gitignore, pnpm-lock.yaml, tsconfig.json, web/tsconfig.json
- .env.development
- .vscode/settings.json
- web/.prettierrc, web/pnpm-workspace.yaml, web/pnpm-lock.yaml
- static/.gitkeep, dist/static/.gitkeep

## D) Recommended delete workflow

1. Delete only section A first.
2. Build and run smoke checks.
3. For section B: sample 5 pages in production/staging and Sanity Studio before each folder batch delete.
4. Keep redirect coverage for old URLs if media links exist externally.
