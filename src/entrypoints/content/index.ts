import type { Locale, MessageType } from '@/lib/types.js'
import { LocaleList } from '@/lib/utils'

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
  const language = locales[0]!
  const languages = JSON.stringify(locales)
  const script = document.createElement('script')
  script.setAttribute('data-language', language)
  script.setAttribute('data-languages', languages)
  script.src = browser.runtime.getURL('/override-language.js')
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

export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_start',
  allFrames: true,
  main() {
    //@ts-expect-error
    browser.runtime.onMessage.addListener((message) => handleMessage(message))

    embedScript()
    sendCurrentState()
  },
})
