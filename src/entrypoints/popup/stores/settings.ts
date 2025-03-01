import { derived, writable } from 'svelte/store'
import { get, set } from '../../../lib/settings'
import { toggleInArray } from '../../../lib/utils'
import { Locale } from '../../../lib/types'

export type Settings = {
  starred: string[]
  showOnlyStarred: boolean
  multiple: boolean
  global: boolean
  globalLocale: Locale
  persist: boolean
}

const initial: Settings = {
  starred: [],
  showOnlyStarred: false,
  multiple: false,
  global: false,
  globalLocale: null as Locale,
  persist: true,
}

export const Settings = writable<Settings>(initial)

get().then((data) => {
  Settings.set({
    ...initial,
    ...data,
  })

  Settings.subscribe((s) => {
    set(s)
  })
})

export const isStarred = derived(Settings, (s) => (code: Locale) => code && s.starred.includes(code))

export function star(code: string) {
  Settings.update((s) => {
    s.starred = toggleInArray(s.starred, code)
    return s
  })
}
