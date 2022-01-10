<script>
  import { locale } from '../stores/locale'
  import Item from './Item.svelte'
</script>

<div>
  <div class="mb2 f6 i">Currently active:</div>
  {#if $locale === null}
    <div class="box tc">No locale set.<br />You can choose one from below.</div>
  {:else}
    <Item code={$locale} />
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
