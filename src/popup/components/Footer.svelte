<script>
  import Github from '../icons/Github.svelte'
  import Shortcuts from './Shortcuts.svelte'
</script>

<div class="flex items-center f7 ph2">
  <Shortcuts />
  <div class="flex-grow" />
  <a href="https://github.com/locale-switcher/locale-switcher/" target="_blank" rel="noreferrer"><Github /></a>
</div>

<style>
  a :global(svg) {
    height: 2em;
  }
</style>
