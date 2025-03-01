<script>
  import Fuse from 'fuse.js'
  import { onMount } from 'svelte'
  import StarFilled from '../icons/StarFilled.svelte'
  import locales from '@/lib/locales.json'
  import { locale } from '../stores/locale'
  import { Settings, star } from '../stores/settings'
  import Item from './Item.svelte'
  import Row from './Row.svelte'
  import Switch from './Switch.svelte'

  let search
  let list
  let needle = ''
  let focused = -1

  const items = Object.entries(locales).map(([code, { name, native }]) => ({
    code,
    name,
    native,
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
      { name: 'code', weight: 0.5 },
      { name: 'name', weight: 1 },
      { name: 'native', weight: 0.25 },
    ],
  }

  $: sorted = items.sort((a, b) => a.code.localeCompare(b.code))
  $: idx = new Fuse(sorted, options)
  $: results = needle.length > 0 ? idx.search(needle).map(({ item }) => item) : sorted
  $: filtered = $Settings.showOnlyStarred ? results.filter(({ code }) => $Settings.starred.includes(code)) : results
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
        focused = focused > 0 ? focused - 1 : filtered.length - 1
        break
      case 'ArrowDown':
        e.preventDefault()
        focused = focused === filtered.length - 1 ? 0 : focused + 1
        break
      case 'ArrowRight':
        e.preventDefault()
        star(filtered[focused].code)
        break
      case 'Enter':
        e.preventDefault()
        $locale = filtered[focused].code
        break
      case 'Delete':
        e.preventDefault()
        $locale = null
        break
    }
  }
</script>

<div class="h-100 flex flex-column">
  <Row>
    <div class="f6 i">Select locales:</div>
    <div class="flex pr2 mr1 items-center">
      <Switch bind:value={$Settings.showOnlyStarred} />
      <div class="ml1" />
      <StarFilled />
    </div>
  </Row>
  <input on:keydown={handleKeyStroke} bind:this={search} type="text" placeholder="Search..." bind:value={needle} />
  <div class="mt2 overflow-auto flex-grow" bind:this={list}>
    {#each filtered as { code }, i}
      <Item {code} focused={i === focused} />
    {/each}
  </div>
</div>
