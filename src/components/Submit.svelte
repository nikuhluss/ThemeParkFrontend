<script>
    import { createEventDispatcher } from 'svelte';

    export let payload = {};

    const dispatch = createEventDispatcher();
    const handleSubmit = () => { dispatch('submit', payload); };
    const handleCancel = () => { dispatch('cancel'); };
</script>

<div class="field is-grouped">

    <div class="control">
        <button type="submit" class="button is-primary" on:click={handleSubmit}>Submit</button>
    </div>

    <div class="control">
        <button class="button is-light" on:click={handleCancel}>Cancel</button>
    </div>

</div>
