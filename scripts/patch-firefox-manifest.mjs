import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const manifestPath = fileURLToPath(import.meta.resolve('../dist/prod/manifest.json'))
const manifest = JSON.parse(await fs.readFile(manifestPath))

/**
 * Needed because "Firefox does not support service workers in MV3 yet"
 * https://github.com/mozilla/web-ext/issues/2532
 */
manifest.background.scripts = [manifest.background.service_worker]
delete manifest.background.service_worker

await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.info('Patched Firefox manifest')
