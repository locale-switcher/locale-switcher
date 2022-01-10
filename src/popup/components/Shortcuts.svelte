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

  {#if expanded}
    <div class="shortcuts flex items-start mt2 code">
      <div>
        <ArrowUp />
        <span>Up</span>
        <br />
        <ArrowDown />
        <span>Down</span>
        <br />
        <ArrowRight />
        <span>Star</span>
      </div>
      <div class="ml3" />
      <div>
        <Enter />
        <span>Select</span>
        <br />
        <Backspace />
        <span>Reset</span>
      </div>
    </div>
  {/if}
</div>
