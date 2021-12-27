import browser from 'webextension-polyfill'
import type { MessageType } from '../types'

const KEY = 'LOCALE_SWITCHER_LANGUAGE'

function embedScript() {
  const locale = window.sessionStorage.getItem(KEY)
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

function sendCurrentState() {
  const locale = window.sessionStorage.getItem(KEY) || null
  const message: MessageType = { type: 'sync', data: locale }
  browser.runtime.sendMessage(message)
}

function handleMessage({ type, data }: MessageType) {
  switch (type) {
    case 'update':
      if (data === window.sessionStorage.getItem(KEY)) break
      if (data) window.sessionStorage.setItem(KEY, data)
      else window.sessionStorage.removeItem(KEY)
      window.location.reload()
      break
  }
}

browser.runtime.onMessage.addListener((message) => handleMessage(message))

embedScript()
sendCurrentState()
