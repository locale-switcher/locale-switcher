import { Locale } from '../entrypoints/shared/types'

export class LocaleList {
  // RegExp for 1 to 3 level language codes. Examples: en, en-US, en-US-POSIX
  // https://en.wikipedia.org/wiki/IETF_language_tag#Syntax_of_language_tags
  static LOCALE_RE = /([A-Za-z\d]+)(-[A-Za-z\d]){0,2}/

  static parse(locales: Locale): string[] {
    const parsed = locales?.split(',').map((l) => l.trim()) || []
    for (const locale of parsed) {
      if (!LocaleList.LOCALE_RE.test(locale)) {
        throw new Error(`Invalid locale: ${locale}`)
      }
    }
    return parsed
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
