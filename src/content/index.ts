import browser from 'webextension-polyfill'
import { LocaleList } from '../shared/utils'
import type { Locale, MessageType } from '../types'

const KEY = 'LOCALE_SWITCHER_LANGUAGE'

function current(): Locale {
  return window.sessionStorage.getItem(KEY) || window.localStorage.getItem(KEY)
}

function clear() {
  window.sessionStorage.removeItem(KEY)
  window.localStorage.removeItem(KEY)
}

function embedScript() {
  const locale = current()
  if (!locale) return

  const locales = LocaleList.parse(locale)
  const languages = `[${locales.map((l) => `"${l}"`).join(', ')}]`
  const language = locales[0]!
  const script = document.createElement('script')
  script.src = browser.runtime.getURL('./src/page-scripts/override-language.js')
  script.setAttribute('data-language', language)
  script.setAttribute('data-languages', languages)
  document.documentElement.prepend(script)
  script.remove()
}

function sendCurrentState() {
  const locale = current()
  const message: MessageType = { type: 'setBackgroundLocaleFromTab', data: locale }
  browser.runtime.sendMessage(message)
}

function handleMessage(message: MessageType) {
  switch (message.type) {
    case 'setTabLocaleFromBackground':
      const locale = current()
      if (message.data.locale === locale) break
      clear()
      if (message.data.locale) {
        const storage =
          message.data.type === 'session' ? window.sessionStorage : window.localStorage
        storage.setItem(KEY, message.data.locale)
      }
      if (window.document.visibilityState === 'visible') window.location.reload()
      break
  }
}

//@ts-expect-error
browser.runtime.onMessage.addListener((message) => handleMessage(message))

embedScript()
sendCurrentState()
