<script>

    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    let availableMaintenanceTypes = [
        {id: "Tune Up", value: "Tune Up"},
        {id: "Replacement", value: "Replacement"},
        {id: "Diagnostic", value: "Diagnostic"},
    ];

    export let maintenanceType = 'Tune Up';
    export let description = '';
    export let cost = 0;

    const handleSubmit = () => {
        dispatch('submit', {maintenanceType, description, cost});
    };

    const handleCancel = () => {
        dispatch('cancel');
    };

</script>

<form class="form" on:submit={handleSubmit}>

    <div class="field">
        <label class="label">Maintenance Type</label>
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

    <div class="field is-grouped">
        <div class="control">
            <button class="button is-light" on:click={handleCancel}>Cancel</button>
        </div>
        <div class="control">
            <button type="submit" class="button is-primary">Submit</button>
        </div>
    </div>
</form>