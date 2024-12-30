import { writable } from 'svelte/store'
import browser from 'webextension-polyfill'
import type { Locale, MessageType } from '../../types'

export const locale = writable<Locale>(null)

// Ask for the current locale
export function update() {
  const current: MessageType = { type: 'getBackgroundLocale', data: undefined }
  browser.runtime.sendMessage(current)
}
update()

// Listen for the current locale
//@ts-expect-error
browser.runtime.onMessage.addListener((message: MessageType) => {
  switch (message.type) {
    case 'setPopupLocale':
      locale.set(message.data)
      break
  }
})

// Send back updates
let updates = 0
locale.subscribe((locale) => {
  // Skip first subscription
  updates++
  if (updates === 1) return

  const message: MessageType = { type: 'setBackgroundLocaleFromPopup', data: locale }
  browser.runtime.sendMessage(message)
})
