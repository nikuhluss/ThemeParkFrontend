<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const handleClose = () => {
        dispatch('close');
    };
</script>

<div class="modal is-active">
  <div class="modal-background" on:click={handleClose} />
  <div class="modal-content">
    <slot></slot>
  </div>
  <button class="modal-close is-large" aria-label="close" on:click={handleClose} />
</div>