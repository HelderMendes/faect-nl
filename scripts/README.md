# Faect Migration Scripts

Scripts to migrate content from WordPress (faect.nl) to Sanity CMS.

## Setup

1. Install dependencies:
   ```bash
   cd scripts
   pnpm install
   ```

2. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```

3. Get a Sanity API token:
   - Go to https://www.sanity.io/manage/project/ymgfr312/api
   - Create a new token with "Editor" permissions
   - Add it to your `.env` file

## Available Scripts

### Run All Migrations
```bash
pnpm run migrate:all
```
Runs all migrations in order: Site Settings → Apps → Homepage → Posts

### Individual Migrations

| Script | Command | Description |
|--------|---------|-------------|
| Site Settings | `npx tsx migrate-site-settings.ts` | Global config, contact info, footer |
| Apps | `npx tsx migrate-apps.ts` | Faect Apps products with factsheets |
| Homepage | `npx tsx migrate-homepage.ts` | Full homepage with all blocks |
| Posts | `npx tsx migrate-posts.ts` | Blog posts from WordPress |

## Migration Details

### What Gets Migrated

| Content | Source | Sanity Type |
|---------|--------|-------------|
| Homepage | faect.nl | `page` with pageBuilder |
| Blog posts | /wp-json/wp/v2/posts | `post` |
| Site settings | Manual | `siteSettings` (singleton) |
| Faect Apps | Manual data | `app` |

### Homepage Blocks Created

1. **blockHero** - Main hero with background image
2. **blockTextWithImage** - Business Central intro section
3. **blockFeatureGrid** - "Waarom Faect" features
4. **blockSectorGrid** - Industry sectors grid
5. **blockServiceCards** - Services overview
6. **blockCTA** - "Klaar om te groeien" section
7. **blockContactInfo** - Contact information

### Images & Files

- Images are automatically downloaded from WordPress and uploaded to Sanity
- PDFs (factsheets) are uploaded to Sanity's asset storage
- Images get proper references in the documents

### What's NOT Migrated (Manual Setup Required)

- Team members (extract from /ons-team/)
- Partners (extract from /partners/)
- Case studies (extract from /klanten-cases/)
- FAQ items

## After Migration

1. **Review in Sanity Studio**
   ```bash
   cd ..
   pnpm sanity dev
   ```

2. **Publish content**
   - All content is created as drafts
   - Review and publish what looks correct

3. **Deploy schema**
   ```bash
   pnpm sanity deploy
   ```

## Troubleshooting

### "Homepage already exists"
Delete the existing homepage in Sanity Studio first, or manually update it.

### Image upload fails
- Check if the source URL is accessible
- Some WordPress images may be protected or moved

### Rate limiting
WordPress may rate-limit API requests. Add delays between requests if needed.

## File Structure

```
scripts/
├── lib/
│   ├── sanity-client.ts      # Sanity client & image upload
│   ├── wordpress-client.ts   # WordPress REST API client
│   └── html-to-portable-text.ts  # HTML → Portable Text converter
├── migrate-all.ts            # Run all migrations
├── migrate-homepage.ts       # Homepage migration
├── migrate-site-settings.ts  # Site settings migration
├── migrate-posts.ts          # Blog posts migration
├── migrate-apps.ts           # Faect Apps migration
├── .env.example              # Environment template
└── README.md                 # This file
```
