import { Locale } from '../types'

export class LocaleList {
  static parse(locales: Locale): string[] {
    return locales?.split(',').map((l) => l.trim()) || []
  }

  static stringify(locales: string[]): Locale {
    return locales.length === 0 ? null : locales.join(',')
  }

  static toggle(locale: Locale, code: string): Locale {
    const locales = LocaleList.parse(locale)
    return LocaleList.stringify(toggleInArray(locales, code))
  }
}

export function toggleInArray<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]
}
