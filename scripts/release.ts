import { version } from '../wxt.config'
import { $ } from 'zx'

$.verbose = true
const name = 'locale-switcher'
console.info(`Version: ${version}`)

console.info(`Building`)
await $`pnpm wxt zip -b chrome`
await $`pnpm wxt zip -b firefox`
await $`pnpm wxt zip -b edge`

console.debug(`Releasing in`)
await $`pnpm wxt submit --firefox-zip .output/${name}-${version}-firefox.zip --firefox-sources-zip .output/${name}-${version}-sources.zip`
