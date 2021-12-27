<script>
  import { locale } from '../lib/store'
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
