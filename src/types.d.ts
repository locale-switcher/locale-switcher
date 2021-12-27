/// <reference types="svelte" />

declare module 'locale-emoji'

interface Message {
  type: string
  data: any
}

interface MessageUpdate extends Message {
  type: 'update'
  data: Locale
}

interface MessageGet extends Message {
  type: 'get'
  data: never
}

export type MessageType = MessageUpdate | MessageGet

export type Locale = string | null
