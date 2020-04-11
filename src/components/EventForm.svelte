<script>
    import Submit from './Submit.svelte'

    let availableEventTypes = [
        {id: "Rainout", value: "Rainout"},
    ];

    export let title = null;
    export let description = null;
    export let eventType = 'Rainout';

</script>



<form class="form">
    <div class="field">
        <label class="label">Title</label>
        <div class="control">
            <input class="input" type="text" placeholder="Title" bind:value={title} />
        </div>
    </div>

    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <input class="input" type="text-box" placeholder="Description" bind:value={description} />
        </div>
    </div>

    <div class="field">
        <label class="label">Event Type</label>
        <div class="control">
            <div class="select">
                <select bind:value={eventType}>
                    {#each availableEventTypes as eventType}
                        <option value={eventType.id}>{eventType.value}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>

    <Submit payload={{title, description, eventType}} on:submit on:cancel />
</form>