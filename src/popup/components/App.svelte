<script>
  import Footer from './Footer.svelte'
  import List from './List.svelte'
  import Selected from './Selected.svelte'
  import Settings from './Settings.svelte'
</script>

<div class="flex flex-column fill">
  <Selected />
  <hr />
  <List />
  <hr />
  <Footer />
</div>

<Settings />
