<script>
  import localeEmoji from 'locale-emoji'
  import { LocaleList } from '@/lib/utils'
  import Menu from '../icons/Menu.svelte'
  import Star from '../icons/Star.svelte'
  import StarFilled from '../icons/StarFilled.svelte'
  import locales from '@/lib/locales.json'
  import { locale } from '../stores/locale'
  import { isStarred, Settings, star } from '../stores/settings'

  export let code
  export let drag = false
  export let focused = false
  let element

  function setLocale() {
    if ($Settings.multiple) {
      $locale = LocaleList.toggle($locale, code)
    } else {
      $locale = code
    }
  }

  $: name = locales[code].name
  $: emoji = localeEmoji(code) || '🇺🇳'

  $: if (focused) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }
</script>

<div
  bind:this={element}
  class="item flex pa2 items-center justify-center"
  class:focused
  class:selected={LocaleList.parse($locale).includes(code)}
  on:click={setLocale}
>
  {#if drag}
    <div class="f4 p2 mr2 drag"><Menu /></div>
  {/if}
  <div class="emoji f3">{emoji}</div>
  <div class="name crop w-100 mh2">{name}</div>
  <div class="code">
    <small>{code}</small>
  </div>
  <div class="ml2 p1 star" on:click|stopPropagation={() => star(code)}>
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

  .drag {
    cursor: move;
  }

  .item:hover,
  .item.focused {
    background-color: var(--bg-alt);
  }

  .item.selected {
    border: 0.125em solid var(--success);
    border-bottom-width: 0.25rem;
    font-weight: bold;
    margin: 0.25rem 0;
  }

  .crop {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .star {
    transition: var(--transition);
  }
  .star:hover,
  .star:focus {
    transform: scale(1.5);
  }
</style>
