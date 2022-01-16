<script context="module">
  import { writable } from 'svelte/store'
  import { fly } from 'svelte/transition'

  export const open = writable(false)
</script>

<script>
  import Close from '../icons/Close.svelte'
  import Earth from '../icons/Earth.svelte'
  import Save from '../icons/Save.svelte'
  import StarFilled from '../icons/StarFilled.svelte'
  import Row from './Row.svelte'
  import Switch from './Switch.svelte'
  import { Settings } from '../stores/settings'
</script>

{#if $open}
  <section transition:fly={{ duration: 250, y: -100 }} class="pa3">
    <Row>
      <b>Settings</b>
      <div class="close pa1" on:click={() => ($open = false)}><Close /></div>
    </Row>

    <div class="mt4 pr2">
      <Row>
        <div class="f6 i">Apply globally:</div>
        <div class="flex items-center">
          <Switch bind:value={$Settings.global} />
          <div class="ml1" />
          <Earth />
        </div>
      </Row>
      <p class="ma0">Apply locales to all tabs.</p>

      <div class="mb4" />
      <Row>
        <div class="f6 i">Persist:</div>
        <div class="flex items-center">
          <Switch bind:value={$Settings.persist} />
          <div class="ml1" />
          <Save />
        </div>
      </Row>
      <p class="ma0">Persist locale across sessions.</p>
    </div>
  </section>
{/if}

<style>
  section {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--bg);
  }

  .close :global(svg) {
    font-size: 1.5rem;
    cursor: pointer;
  }
</style>
