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
  locales[row[0]] = {
    name: row[1],
    native: row[2],
  }
}

console.log('Writing...')
fs.writeFileSync('./src/popup/lib/locales.json', JSON.stringify(locales, null, 2))
console.log('Done')
