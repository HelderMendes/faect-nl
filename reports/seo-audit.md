# SEO Audit (Actionable)

Generated: 2026-07-01

## Summary

The app has partial metadata coverage. Core legal/info routes are covered, but several important dynamic and listing pages are missing route metadata.

## Findings (by priority)

1. Missing metadata on major routes

- web/app/page.tsx
- web/app/[slug]/page.tsx
- web/app/blog-nieuws/page.tsx
- web/app/blog-nieuws/[slug]/page.tsx
- web/app/support/page.tsx (redirect-only route, acceptable but consider noindex behavior)

Impact:

- Generic titles/descriptions inherited from layout reduce SERP relevance.

2. Root layout language is set to English

- web/app/layout.tsx uses <html lang="en"> while content is predominantly Dutch.

Impact:

- Weaker language targeting for nl-NL search.

3. No sitemap.ts and robots.ts found

- Missing files in web/app/.

Impact:

- Lower crawl discoverability and weaker crawl directives.

4. Canonical strategy not explicit on most pages

- Limited use of alternates/canonical in metadata.

Impact:

- Risk of duplicate-content ambiguity when redirect aliases exist.

## Recommended fixes

1. Add metadata (or generateMetadata) to missing routes

- Include title, description, alternates.canonical
- For blog detail: derive title/description/og from post data

2. Change root lang to Dutch

- web/app/layout.tsx: html lang="nl"

3. Add sitemap and robots route handlers

- web/app/sitemap.ts
- web/app/robots.ts

4. Add Open Graph/Twitter tags consistently

- At minimum for home, blog listing/detail, dynamic pages.

## Suggested implementation order

1. Update lang in layout
2. Add sitemap.ts + robots.ts
3. Add metadata to blog pages
4. Add metadata to generic dynamic page [slug]
5. Add metadata to homepage

## Notes

- Route metadata coverage source: reports/route-metadata-coverage.txt
- Existing redirects for help-en-ondersteuning are good; keep canonical pointing to /help-en-ondersteuning.
