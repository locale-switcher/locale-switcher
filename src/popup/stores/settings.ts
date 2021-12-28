import { derived, writable } from 'svelte/store'
import Browser from 'webextension-polyfill'
import { Locale } from '../../types'

export type Settings = {
  starred: string[]
  showOnlyStarred: boolean
}

const initial: Settings = {
  starred: [],
  showOnlyStarred: false,
}

export const Settings = writable<Settings>(initial)

Browser.storage.local.get().then((data) => {
  Settings.set({
    ...initial,
    ...data,
  })

  Settings.subscribe((s) => {
    Browser.storage.local.set(s)
  })
})

export const isStarred = derived(Settings, (s) => (code: Locale) => code && s.starred.includes(code))

export function star(code: string) {
  Settings.update((s) => {
    s.starred = s.starred.includes(code) ? s.starred.filter((c) => c !== code) : [...s.starred, code]
    return s
  })
}
