<script>
  import Sortable from 'sortablejs'
  import { onMount } from 'svelte'
  import { LocaleList } from '../../shared/utils'
  import Multiple from '../icons/Multiple.svelte'
  import { locale } from '../stores/locale'
  import { Settings } from '../stores/settings'
  import Item from './Item.svelte'
  import Switch from './Switch.svelte'

  let list
  $: selected = $locale ? $locale.split(',') : []

  // When languages are dragged, save the new order the locale
  function onUpdate(e) {
    const locales = LocaleList.parse($locale)
    const item = locales[e.oldDraggableIndex]
    locales.splice(e.oldDraggableIndex, 1)
    locales.splice(e.newDraggableIndex, 0, item)
    $locale = LocaleList.stringify(locales)
  }

  onMount(() => {
    Sortable.create(list, { onUpdate })
  })
</script>

<div>
  <div class="flex items-end mb2">
    <div class="f6 i">Currently active:</div>
    <div class="flex-grow" />
    <div class="flex pr2 mr1 items-center">
      <Switch bind:value={$Settings.multiple} />
      <div class="ml1" />
      <Multiple />
    </div>
  </div>

  <div bind:this={list}>
    {#each selected as item (item)}
      <Item code={item} drag={$Settings.multiple} />
    {/each}
  </div>

  {#if selected.length === 0}
    <div class="box tc">No locale set.<br />You can choose one from below.</div>
  {:else}
    <input class="mt2" type="button" value="Clear" on:click={() => ($locale = null)} />
  {/if}
</div>

<style>
  .box {
    border: 0.125rem solid var(--bg-alt);
    border-bottom-width: 0.25rem;
    border-radius: var(--radius);
    padding: 0.5rem;
  }
</style>
