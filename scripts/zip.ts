import { $ } from 'zx'

$.verbose = true

await Promise.all(['chrome', 'firefox', 'edge'].map((browser) => $`pnpm wxt zip -b ${browser}`))
