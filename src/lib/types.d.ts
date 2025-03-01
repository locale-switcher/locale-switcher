/// <reference types="svelte" />

export type Locale = string | null

type Message<T extends string, D = undefined> = {
  type: T
  data: D
}

export type MessageUpdateTab = Message<
  'setTabLocaleFromBackground',
  { locale: Locale; type: 'session' | 'local' }
>
export type MessageUpdate = Message<'setBackgroundLocaleFromPopup', Locale>
export type MessageSync = Message<'setBackgroundLocaleFromTab', Locale>
export type MessageCurrentInput = Message<'getBackgroundLocale'>
export type MessageCurrentOutput = Message<'setPopupLocale', Locale>

export type MessageType =
  | MessageUpdate
  | MessageSync
  | MessageCurrentInput
  | MessageCurrentOutput
  | MessageUpdateTab
