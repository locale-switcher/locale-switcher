<script>
  export let value
</script>

<label>
  <input type="checkbox" bind:checked={value} />
  <span />
</label>

<style>
  label {
    --p: 0.25em;
    position: relative;
    display: inline-block;
    width: 2.5em;
    height: 1.25em;
  }

  input {
    display: none;
  }

  span {
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: var(--bg-alt);
    border-radius: var(--radius);
    transition: var(--transition);
  }

  span:before {
    position: absolute;
    content: '';
    height: calc(100% - (2 * var(--p)));
    width: calc(50% - (2 * var(--p)));
    left: var(--p);
    top: var(--p);
    border-radius: var(--radius);
    background-color: white;
    transition: var(--transition);
  }

  input:checked + span {
    background-color: var(--success);
  }

  input:checked + span:before {
    transform: translateX(calc(200% - var(--p)));
  }
</style>
