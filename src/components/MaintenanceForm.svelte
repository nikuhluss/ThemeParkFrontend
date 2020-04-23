<script>
    import Submit from './Submit.svelte';

    let availableMaintenanceTypes = [
        {id: "Tune Up", value: "Tune Up"},
        {id: "Replacement", value: "Replacement"},
        {id: "Diagnostic", value: "Diagnostic"},
    ];

    export let maintenanceType = 'Tune Up';
    export let description = '';
    export let cost = 0;
</script>

<form class="form" on:submit|preventDefault={() => {}}>
    <div class="field">
        <label class="label">Maintenance type</label>
        <div class="control">
            <div class="select">
                <select bind:value={maintenanceType}>
                    {#each availableMaintenanceTypes as mtype}
                        <option value={mtype.id}>{mtype.value}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>

    <div class="field">
        <label class="label">Description</label>
        <div class="control">
            <textarea class="textarea" type="text" placeholder="Description" bind:value={description} />
        </div>
    </div>

    <div class="field">
        <label class="label">Cost</label>
        <div class="control">
            <input class="input" type="number" placeholder="Name" min=0 max=100000 bind:value={cost} />
        </div>
    </div>

    <Submit payload={{maintenanceType, description, cost}} on:submit on:cancel />
</form>