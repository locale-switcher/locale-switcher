<script>
  import ArrowDown from '../icons/ArrowDown.svelte'
  import ArrowRight from '../icons/ArrowRight.svelte'
  import ArrowUp from '../icons/ArrowUp.svelte'
  import Backspace from '../icons/Backspace.svelte'
  import Enter from '../icons/Enter.svelte'
  import Eye from '../icons/Eye.svelte'
  import EyeClosed from '../icons/EyeClosed.svelte'

  let expanded = false
</script>

<div>
  <div class="toggle pointer" on:click={() => (expanded = !expanded)}>
    {#if expanded}
      <EyeClosed /> Hide shortcuts
    {:else}
      <Eye /> Show shortcuts
    {/if}
  </div>

  <div class:expanded class="shortcuts flex items-start code">
    <div>
      <ArrowUp />
      <kbd>Up</kbd>
      <br />
      <ArrowDown />
      <kbd>Down</kbd>
      <br />
      <ArrowRight />
      <kbd>Star</kbd>
    </div>
    <div class="ml3"></div>
    <div>
      <Enter />
      <kbd>Select</kbd>
      <br />
      <Backspace />
      <kbd>Reset</kbd>
    </div>
  </div>
</div>

<style>
  .shortcuts {
    height: 0;
    overflow: hidden;
    transition: var(--transition);
  }

  .shortcuts.expanded {
    height: 2.75rem;
    margin-top: 0.5rem;
  }
</style>
