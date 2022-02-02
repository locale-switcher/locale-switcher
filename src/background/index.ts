import Browser from 'webextension-polyfill'
import browser, { WebRequest } from 'webextension-polyfill'
import { get, set, Settings } from '../shared/settings'
import { LocaleList } from '../shared/utils'
import type { Locale, MessageType } from '../types'

let ram: Map<number, Locale> = new Map()
let settings: Settings

// Setup and subscribe to settings
get().then((data) => (settings = data))
Browser.storage.onChanged.addListener(async (changes) => {
  for (const [key, change] of Object.entries(changes)) {
    // @ts-ignore
    settings[key] = change.newValue
  }
})

function getLocaleForTab(tabId: number) {
  if (settings.global) return settings.globalLocale
  return ram.get(tabId) || null
}

function updateLocale(tabId: number, value: Locale) {
  value ||= null
  if (value === ram.get(tabId)) return
  const msg: MessageType = {
    type: 'setTabLocaleFromBackground',
    data: { locale: value, type: settings.persist && !settings.global ? 'local' : 'session' },
  }
  browser.tabs.sendMessage(tabId, msg)
  ram.set(tabId, value)
  setBadge(tabId)
}

async function getCurrentTabId() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  return tabs[0]?.id ?? null
}

async function setBadge(tabId: number) {
  updatePopupState(tabId)
  const locale: Locale = getLocaleForTab(tabId) || null
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
    const locale = getLocaleForTab(details.tabId)
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
browser.tabs.onActivated.addListener((tabId) => {
  setBadge(tabId.tabId)
})
browser.tabs.onUpdated.addListener(async () => {
  const tabId = await getCurrentTabId()
  if (tabId) setBadge(tabId)
})

function updatePopupState(tabId: number) {
  const locale: Locale = settings.global ? settings.globalLocale : getLocaleForTab(tabId)
  const msg: MessageType = { type: 'setPopupLocale', data: locale }
  browser.runtime.sendMessage(msg)
}

// Listener for messages from content scripts
browser.runtime.onMessage.addListener(async (message: MessageType, sender) => {
  switch (message.type) {
    case 'setBackgroundLocaleFromTab': {
      const tabId = sender.tab?.id ?? null
      if (tabId) updateLocale(tabId, settings.global ? settings.globalLocale : message.data)
      break
    }

    case 'setBackgroundLocaleFromPopup': {
      let tabIds: number[] = []
      if (settings.global) {
        await set({ globalLocale: message.data })
        const tabs = await Browser.tabs.query({})
        tabs.forEach((tab) => tabIds.push(tab.id!))
      } else {
        const tabId = await getCurrentTabId()
        if (tabId) tabIds.push(tabId)
      }
      for (const tabId of tabIds) {
        updateLocale(tabId, message.data)
      }
      break
    }

    case 'getBackgroundLocale': {
      const tabId = await getCurrentTabId()
      if (tabId) updatePopupState(tabId)
    }
  }
})
