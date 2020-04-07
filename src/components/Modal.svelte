<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let title = null;

    const handleClose = () => {
        dispatch('close');
    };
</script>

<div class="modal is-active">
  <div class="modal-background" on:click={handleClose} />
  <div class="modal-content">
    {#if title}
        <h2 class="title is-4 has-text-light">{title}</h2>
    {/if}
    <slot></slot>
  </div>
  <button class="modal-close is-large" aria-label="close" on:click={handleClose} />
</div>

