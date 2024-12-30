import browser from 'webextension-polyfill'
import { get, set, Settings } from '../shared/settings'
import { LocaleList } from '../shared/utils'
import type { Locale, MessageType } from '../types'

let ram: Map<number, Locale> = new Map()
let settings: Settings

// Setup and subscribe to settings
get().then((data) => (settings = data))
browser.storage.onChanged.addListener(async (changes) => {
  for (const [key, change] of Object.entries(changes)) {
    // @ts-ignore
    settings[key] = change.newValue
  }
})

function getLocaleForTab(tabId: number) {
  if (settings.global) return settings.globalLocale
  return ram.get(tabId) || null
}

function updateDeclarativeNetRequest(tabId: number, value: Locale) {
  if (value) {
    const acceptLanguage = LocaleList.parse(value)
      // Add quality score https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language#directives
      .map((l, i) => (i === 0 ? l : `${l};q=0.${Math.max(10 - i, 1)}`))
      .join(', ')
    browser.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [tabId],
      addRules: [
        {
          id: tabId,
          priority: 1,
          action: {
            type: 'modifyHeaders',
            requestHeaders: [
              {
                operation: 'set',
                header: 'Accept-Language',
                value: acceptLanguage,
              },
            ],
          },
          condition: {
            tabIds: [tabId],
            //@ts-expect-error wrong typing
            resourceTypes: Object.values(browser.declarativeNetRequest.ResourceType),
          },
        },
      ],
    })
  } else {
    browser.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [tabId],
    })
  }

  ram.set(tabId, value)
}

function updateLocale(tabId: number, value: Locale) {
  value ||= null
  if (value === ram.get(tabId)) return
  const msg: MessageType = {
    type: 'setTabLocaleFromBackground',
    data: { locale: value, type: settings.persist && !settings.global ? 'local' : 'session' },
  }
  browser.tabs.sendMessage(tabId, msg)
  updateDeclarativeNetRequest(tabId, value)
  setBadge(tabId)
}

async function getCurrentTabId() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  return tabs[0]?.id ?? null
}

async function setBadge(tabId: number) {
  updatePopupState(tabId)
  const locale: Locale = getLocaleForTab(tabId) || null
  browser.action.setBadgeText({ text: locale })
}

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
//@ts-expect-error
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
        const tabs = await browser.tabs.query({})
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
  // Does not work unfortunately
  // Uncaught (in promise) Error: Could not establish connection. Receiving end does not exist.
  // still occurs.
  return Promise.resolve('Dummy response to keep the console quiet')
})
