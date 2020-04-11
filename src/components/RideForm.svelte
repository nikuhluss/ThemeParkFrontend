<script>
    import Submit from './Submit.svelte';

    export let name = '';
    export let minAge = 0;
    export let minHeight = 0;
    export let description = '';
</script>

<form class="form">
    <div class="field">
        <label class="label">Name</label>
        <div class="control">
            <input class="input" type="text" placeholder="Name" bind:value={name} />
        </div>
    </div>

    <div class="field">
        <label class="label">Minimum age</label>
        <div class="control">
            <input class="input" type="number" placeholder="Name" min=0 max=200 bind:value={minAge} />
        </div>
    </div>

    <div class="field">
        <label class="label">Minimum height</label>
        <div class="control">
            <input class="input" type="number" placeholder="Name" min=0 max=400 bind:value={minHeight} />
        </div>
    </div>

    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea class="textarea" type="text" placeholder="Description" bind:value={description} />
        </div>
    </div>

    <Submit payload={{name, minAge, minHeight, description}} on:submit on:cancel />
</form>