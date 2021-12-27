/// <reference types="svelte" />

export type Locale = string | null

type Message<T extends string, D = undefined> = {
  type: T
  data: D
}

export type MessageUpdate = Message<'update', Locale>
export type MessageSync = Message<'sync', Locale>
export type MessageCurrentInput = Message<'current-input'>
export type MessageCurrentOutput = Message<'current-output', Locale>

export type MessageType = MessageUpdate | MessageSync | MessageCurrentInput | MessageCurrentOutput
