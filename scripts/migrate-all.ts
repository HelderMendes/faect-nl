/**
 * Full Migration Script
 *
 * Runs all migrations in the correct order:
 * 1. Site Settings (global config)
 * 2. Apps (referenced by other content)
 * 3. Homepage (uses apps showcase)
 * 4. Blog Posts
 *
 * Run: npx tsx migrate-all.ts
 */

import {execSync} from 'child_process'

const migrations = [
  {name: 'Site Settings', script: 'migrate-site-settings.ts'},
  {name: 'Faect Apps', script: 'migrate-apps.ts'},
  {name: 'Homepage', script: 'migrate-homepage.ts'},
  {name: 'Blog Posts', script: 'migrate-posts.ts'},
]

async function runAllMigrations() {
  console.log('🚀 Starting full migration...\n')
  console.log('=' .repeat(50))

  for (const migration of migrations) {
    console.log(`\n📦 Running: ${migration.name}`)
    console.log('-'.repeat(50))

    try {
      execSync(`npx tsx ${migration.script}`, {
        stdio: 'inherit',
        cwd: process.cwd(),
      })
      console.log(`✅ ${migration.name} completed`)
    } catch (error) {
      console.error(`❌ ${migration.name} failed`)
      // Continue with other migrations even if one fails
    }

    console.log('='.repeat(50))
  }

  console.log('\n🎉 Full migration complete!')
  console.log('\nNext steps:')
  console.log('1. Review content in Sanity Studio: pnpm sanity dev')
  console.log('2. Publish drafts that look correct')
  console.log('3. Build frontend components for new block types')
}

runAllMigrations()
