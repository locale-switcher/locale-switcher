<script>
  import Fuse from 'fuse.js'
  import { onMount } from 'svelte'
  import namesByLocale from '../lib/locales.json'
  import { locale } from '../lib/store'
  import Item from './Item.svelte'

  let search
  let list
  let needle = ''
  let focused = -1

  const items = Object.entries(namesByLocale).map(([code, name]) => ({
    code,
    name,
  }))
  const options = {
    id: 'code',
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      { name: 'code', weight: 0.3 },
      { name: 'name', weight: 0.7 },
    ],
  }
  const idx = new Fuse(items, options)

  $: results = needle.length > 0 ? idx.search(needle).map(({ item }) => item) : items
  $: {
    needle
    focused = -1
    if (list) list.scrollTop = 0
  }

  onMount(() => {
    search.focus()
  })

  function handleKeyStroke(e) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        focused = focused > 0 ? focused - 1 : results.length - 1
        break
      case 'ArrowDown':
        e.preventDefault()
        focused = focused === results.length - 1 ? 0 : focused + 1
        break
      case 'Enter':
        e.preventDefault()
        $locale = results[focused].code
        break
    }
  }
</script>

<div class="h-100 flex flex-column">
  <div class="mb2 f6 i">Select locales:</div>
  <input on:keydown={handleKeyStroke} bind:this={search} type="text" placeholder="Search..." bind:value={needle} />
  <div class="mt2 overflow-auto flex-grow" bind:this={list}>
    {#each results as { code }, i}
      <Item {code} focused={i === focused} on:click={() => ($locale = code)} />
    {/each}
  </div>
</div>
