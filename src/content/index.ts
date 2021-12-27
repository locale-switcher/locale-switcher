import browser from 'webextension-polyfill'
import type { MessageType } from '../types'

const KEY = 'LOCALE_SWITCHER_LANGUAGE'

function embedScript() {
  const locale = window.localStorage.getItem(KEY)
  if (!locale) return

  const code = `
    (() => {
      Object.defineProperties(window.navigator.__proto__, {
        language: {
          value: '${locale}',
          enumerable: true,
        },
        languages: {
          value: ['${locale}'],
          enumerable: true,
        }
      });
    })();`

  const script = document.createElement('script')
  script.textContent = code
  document.documentElement.prepend(script)
  script.remove()
}

function handleMessage({ type, data }: MessageType) {
  switch (type) {
    case 'update':
      if (data === window.localStorage.getItem(KEY)) break
      if (data) window.localStorage.setItem(KEY, data)
      else window.localStorage.removeItem(KEY)
      window.location.reload()
      break

    case 'get':
      const locale = window.localStorage.getItem(KEY) || null
      browser.runtime.sendMessage({ type: 'get', data: locale })
      break
  }
}

browser.runtime.onMessage.addListener((message) => handleMessage(message))
embedScript()
