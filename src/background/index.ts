import browser, { WebRequest } from 'webextension-polyfill'
import type { Locale, MessageType } from '../types'

declare const chrome: any
let locale: Locale = null

function updateLocale(value: Locale) {
  if (value === locale) return
  locale = value || null
  browser.storage.local.set({ locale })
  browser.browserAction.setBadgeText({ text: locale })
}

async function sendMessageToActiveTabs(message: MessageType) {
  const active = await browser.tabs.query({ active: true, currentWindow: true })
  for (const tab of active) {
    if (tab.id) browser.tabs.sendMessage(tab.id, message)
  }
}

async function getCurrentLocale() {
  const active = await browser.tabs.query({ active: true, currentWindow: true })
  for (const tab of active) {
    if (tab.id) browser.tabs.sendMessage(tab.id, { type: 'get' })
  }
}

// Intercept Accept-Language headers
const options: WebRequest.OnBeforeSendHeadersOptions[] = ['blocking', 'requestHeaders']
if (chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS')) {
  options.push('extraHeaders')
}
browser.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (!locale) return
    for (const header of details.requestHeaders || []) {
      if (header.name.toLowerCase() === 'accept-language') {
        header.value = locale
        break
      }
    }
    return { requestHeaders: details.requestHeaders || [] }
  },
  { urls: ['<all_urls>'] },
  options
)

// Update on tab change or new urls
browser.tabs.onActivated.addListener(() => getCurrentLocale())
browser.tabs.onUpdated.addListener(() => getCurrentLocale())

// Listener for messages from content scripts
browser.runtime.onMessage.addListener(({ type, data }) => {
  switch (type) {
    case 'get':
      updateLocale(data)
      break
  }
})

// Listen for changes to the locale
browser.storage.onChanged.addListener((changes) => {
  const change = changes['locale']
  if (change) {
    updateLocale(change.newValue)
    sendMessageToActiveTabs({ type: 'update', data: locale })
  }
})
