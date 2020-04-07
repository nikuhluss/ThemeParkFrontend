<script>

    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    export let name = '';
    export let description = '';
    export let minAge = 0;
    export let minHeight = 0;

    const handleSubmit = () => {
        dispatch('submit', {name, description, minAge, minHeight});
    };

    const handleCancel = () => {
        dispatch('cancel');
    };

</script>

<form class="form" on:submit={handleSubmit}>
    <div class="field">
        <label class="label">Name</label>
        <div class="control">
            <input class="input" type="text" placeholder="Name" bind:value={name} />
        </div>
    </div>

    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea class="textarea" type="text" placeholder="Description" bind:value={description} />
        </div>
    </div>

    <div class="field">
        <label class="label">Minimum Age</label>
        <div class="control">
            <input class="input" type="number" placeholder="Name" min=0 max=200 bind:value={minAge} />
        </div>
    </div>

    <div class="field">
        <label class="label">Minimum Height</label>
        <div class="control">
            <input class="input" type="number" placeholder="Name" min=0 max=400 bind:value={minHeight} />
        </div>
    </div>


    <div class="field is-grouped">
        <div class="control">
            <button class="button is-light" on:click={handleCancel}>Cancel</button>
        </div>
        <div class="control">
            <button type="submit" class="button is-primary">Submit</button>
        </div>
    </div>

</form>