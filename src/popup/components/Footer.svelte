<script>
  import ArrowDown from '../icons/ArrowDown.svelte'
  import ArrowRight from '../icons/ArrowRight.svelte'
  import ArrowUp from '../icons/ArrowUp.svelte'
  import Enter from '../icons/Enter.svelte'
  import Github from '../icons/Github.svelte'
</script>

<div class="flex items-center code f7 ph2">
  <!-- ← ⮐ ➡ -->
  <div class="shortcuts flex items-center">
    <ArrowUp /><ArrowDown />
    <span> Up/Down</span>
    <div class="mh2" />
    <ArrowRight />
    <span>Star</span>
    <div class="mh2" />
    <Enter />
    <span>Select</span>
  </div>
  <div class="flex-grow" />
  <a href="https://github.com/locale-switcher/locale-switcher/" target="_blank" rel="noreferrer"><Github /></a>
</div>

<style>
  a :global(svg) {
    height: 2em;
  }

  .shortcuts span {
    margin-left: 0.2em;
  }
</style>
