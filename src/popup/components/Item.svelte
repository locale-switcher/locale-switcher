<script>
  import localeEmoji from 'locale-emoji'
  import Star from '../icons/Star.svelte'
  import StarFilled from '../icons/StarFilled.svelte'
  import locales from '../lib/locales.json'
  import { locale } from '../stores/locale'
  import { isStarred, star } from '../stores/settings'

  export let code
  export let focused = false
  let element

  $: name = locales[code]
  $: emoji = localeEmoji(code) || '🇺🇳'

  $: if (focused) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }
</script>

<div
  bind:this={element}
  class="item flex pa2 items-center justify-center"
  class:selected={$locale === code}
  class:focused
  on:click
>
  <div class="emoji f3">{emoji}</div>
  <div class="name crop w-100 mh2">{name}</div>
  <div class="code">
    <small>{code}</small>
  </div>
  <div class="ml2 ph1" on:click|stopPropagation={() => star(code)}>
    {#if $isStarred(code)}
      <StarFilled />
    {:else}
      <Star />
    {/if}
  </div>
</div>

<style>
  .item {
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
    border-radius: var(--radius);
  }

  .item:hover,
  .item.focused {
    background-color: var(--bg-alt);
  }

  .item.selected {
    border: 0.125em solid var(--success);
    border-bottom-width: 0.25rem;
    font-weight: bold;
  }

  .crop {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
