<script>
    import Submit from './Submit.svelte'

    let availableEventTypes = [
        {id: "Rainout", value: "Rainout"},
    ];

    export let eventType = 'Rainout';
    export let title = null;
    export let description = null;

</script>

<form class="form">
    <div class="field">
        <label class="label">Event type</label>
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

    <Submit payload={{eventType, title, description}} on:submit on:cancel />
</form>
