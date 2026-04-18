import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ymgfr312',
    dataset: 'faect'
  },
  deployment: {
    appId: 'boj3hzl8skswmw4w65r8tigr',
    autoUpdates: true,
  }
})
