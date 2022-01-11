import browser, { WebRequest } from 'webextension-polyfill'
import { LocaleList } from '../shared/utils'
import type { Locale, MessageType } from '../types'

let ram: Map<number, Locale> = new Map()

function updateLocale(tabId: number, value: Locale) {
  value ||= null
  if (value === ram.get(tabId)) return
  ram.set(tabId, value)
  setBadge(tabId)
}

async function getCurrentTabId() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  return tabs[0]?.id ?? null
}

async function setBadge(tabId: number) {
  sendCurrentState(tabId)
  const locale: Locale = ram.get(tabId) || null
  browser.browserAction.setBadgeText({ text: locale })
}

// Intercept Accept-Language headers
const options: WebRequest.OnBeforeSendHeadersOptions[] = ['blocking', 'requestHeaders']
// @ts-ignore
if (chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS')) {
  options.push('extraHeaders')
}
browser.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const locale = ram.get(details.tabId)
    if (!locale) return
    for (const header of details.requestHeaders || []) {
      if (header.name.toLowerCase() === 'accept-language') {
        header.value = LocaleList.parse(locale)
          // Add quality score https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language#directives
          .map((l, i) => (i === 0 ? l : `${l};q=0.${Math.max(10 - i, 1)}`))
          .join(', ')
        break
      }
    }
    return { requestHeaders: details.requestHeaders || [] }
  },
  { urls: ['<all_urls>'] },
  options
)

// Update on tab change or new urls
browser.tabs.onActivated.addListener((tabId) => setBadge(tabId.tabId))
browser.tabs.onUpdated.addListener(async () => {
  const tabId = await getCurrentTabId()
  if (tabId) setBadge(tabId)
})

function sendCurrentState(tabId: number) {
  const locale: Locale = (tabId && ram.get(tabId)) || null
  const msg: MessageType = { type: 'setPopupLocale', data: locale }
  browser.runtime.sendMessage(msg)
}

// Listener for messages from content scripts
browser.runtime.onMessage.addListener(async (message: MessageType, sender) => {
  switch (message.type) {
    case 'setBackgroundLocaleFromTab': {
      const tabId = sender.tab?.id ?? null
      if (tabId) updateLocale(tabId, message.data)
      break
    }

    case 'setBackgroundLocaleFromPopup': {
      const tabId = await getCurrentTabId()
      if (tabId) {
        updateLocale(tabId, message.data)
        const msg: MessageType = { type: 'setBackgroundLocaleFromPopup', data: message.data }
        browser.tabs.sendMessage(tabId, msg)
      }
      break
    }

    case 'getBackgroundLocale': {
      const tabId = await getCurrentTabId()
      if (tabId) sendCurrentState(tabId)
    }
  }
})
