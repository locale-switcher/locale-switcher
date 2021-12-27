import { writable } from 'svelte/store'
import browser from 'webextension-polyfill'
import type { Locale } from '../../types'

export const locale = writable<Locale>(null)

browser.storage.local.get('locale').then((result) => {
  locale.set(result['locale'] || null)

  let updates = 0
  locale.subscribe((locale) => {
    // Skip first subscription
    updates++
    if (updates === 1) return

    browser.storage.local.set({ locale })
  })
})
