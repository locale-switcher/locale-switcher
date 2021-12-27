<script>
  import localeEmoji from 'locale-emoji'
  import locales from '../lib/locales.json'
  import { locale } from '../lib/store'

  export let code
  export let focused = false
  let element

  $: name = locales[code].name
  $: emoji = localeEmoji(code) || '🇺🇳'

  $: if (focused) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }
</script>

<div bind:this={element} class="item flex flex-center pa2" class:selected={$locale === code} class:focused on:click>
  <div class="emoji f3">{emoji}</div>
  <div class="name crop w-100 mh2">{name}</div>
  <div class="code">
    <small>{code}</small>
  </div>
</div>
