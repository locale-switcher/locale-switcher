import { Locale } from '../entrypoints/shared/types'

export type Settings = {
  starred: string[]
  showOnlyStarred: boolean
  multiple: boolean
  global: boolean
  globalLocale: Locale
  persist: boolean
}

export const initial: Settings = {
  starred: [],
  showOnlyStarred: false,
  multiple: false,
  global: false,
  globalLocale: null as Locale,
  persist: true,
}

export async function get() {
  const data = await browser.storage.local.get()
  return {
    ...initial,
    ...data,
  }
}

export async function set(settings: Partial<Settings>) {
  await browser.storage.local.set(settings)
}
