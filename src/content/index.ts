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
  const asString = `[${locales.map((l) => `"${l}"`).join(', ')}]`
  const code = `
    (() => {
      Object.defineProperties(window.navigator.__proto__, {
        language: {
          value: '${locales[0]}',
          enumerable: true,
        },
        languages: {
          value: ${asString},
          enumerable: true,
        }
      });
    })();`

  const script = document.createElement('script')
  script.textContent = code
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
        const storage = message.data.type === 'session' ? window.sessionStorage : window.localStorage
        storage.setItem(KEY, message.data.locale)
      }
      if (window.document.visibilityState === 'visible') window.location.reload()
      break
  }
}

browser.runtime.onMessage.addListener((message) => handleMessage(message))

embedScript()
sendCurrentState()
