import axios from 'axios'
import { JSDOM } from 'jsdom'
import fs from 'fs'

console.log('Downloading...')
const { data: html } = await axios({
  url: 'https://www.localeplanet.com/icu/index.html',
  method: 'get',
})
const dom = new JSDOM(html)

console.log('Parsing...')
const raw = []
const rows = dom.window.document.querySelectorAll('table tr')
rows.forEach((el) => {
  const row = []
  el.querySelectorAll('td').forEach((el) => row.push(el.textContent.trim()))
  raw.push(row)
})

const locales = {}
for (const row of raw.slice(1)) {
  const code = row[0].replace(/_/g, '-')
  const name = row[1]
  const native = row[2]
  locales[code] = {
    name,
    native,
  }
}
console.log('Found', Object.keys(locales).length, 'locales')

console.log('Writing...')
fs.writeFileSync('./src/popup/lib/locales.json', JSON.stringify(locales, null, 2) + '\n')
console.log('Done')