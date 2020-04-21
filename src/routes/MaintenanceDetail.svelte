<script>
    import { onMount } from 'svelte';
    import { link } from 'svelte-spa-router';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';
    import dayjs from 'dayjs';

    import Modal from '../components/Modal.svelte';
    import MaintenanceForm from '../components/MaintenanceForm.svelte';

    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();

    export let params;

    let maintenance = null;
    $: maintenanceClosed = (maintenance && !!maintenance.end) || false;

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get(`/maintenance/${params.maintenanceId}`);
            maintenance = response.data;
        } catch (err) {
            console.error(err);
            addNotification({type: 'danger', position: 'bottom-right', removeAfter: 4000, text: err.response.data.error});
        }
    });

    // editing maintenance handlers

    let editing = false;

    const handleEdit = () => {
        editing = true;
    };

    const handleEditCancel = () => {
        editing = false;
    };

    const handleEditSubmit = async (event) => {
        const maintenanceInfo = event.detail;
        const updatedMaintenance = {...maintenance, ...maintenanceInfo};
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.put(`/maintenance/${params.maintenanceId}`, updatedMaintenance);
            maintenance = response.data;
            editing = false;
        } catch (err) {
            console.error(err);
            addNotification({type: 'danger', position: 'bottom-right', removeAfter: 4000, text: err.response.data.error});
        }
    };

    // maintenance close handlers

    const handleMaintenanceClose = async (event) => {

        if (!confirm("Are you sure you want to close this maintenance job?")) {
            return;
        }

        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.post(`/maintenance/${params.maintenanceId}/close`);
            maintenance = response.data
        } catch (err) {
            console.error(err);
            addNotification({type: 'danger', position: 'bottom-right', removeAfter: 4000, text: err.response.data.error});
        }
    };

</script>

{#if !maintenance}
    Loading...
{:else}

    {#if editing}
        <Modal title="Edit maintenance" on:close={handleEditCancel}>
            <div class="box">
                <MaintenanceForm {...maintenance} on:submit={handleEditSubmit} on:cancel={handleEditCancel} />
            </div>
        </Modal>
    {/if}

    <h1 class="title">Maintenance job</h1>
    <p class="subtitle">
        On ride <a href={`/dashboard/rides/${maintenance.rideId}`} use:link>{maintenance.rideName}</a>
    </p>
    {#if maintenanceClosed}
        <div class="notification is-warning">
            This maintenance job is <strong>already</strong> closed. Changing
            its details will reopen it.
        </div>
    {/if}
    <div class="content">
        <p>
            {maintenance.description}
        </p>
        <p>
            <strong>Type: </strong><span>{maintenance.maintenanceType}</span>
            <br />
            <strong>Cost: </strong><span>${maintenance.cost}</span>
            <br />
            <strong>Start date: </strong><time datetime={maintenance.start}>{dayjs(maintenance.start).format('MM/DD/YYYY h:mm A')}</time>
            <br />
            <strong>End date: </strong><time datetime={maintenance.end}>{dayjs(maintenance.end).format('MM/DD/YYYY h:mm A')}</time>
            <br />
        </p>
    </div>

    <div class="columns is-multiline">
        <div class="column is-one-third">
            <h2 class="title">Assignees</h2>
            <p class="subtitle">TBD</p>
        </div>

        <div class="column is-two-thirds">
            <h2 class="title">Actions</h2>
            <button class="button is-small" on:click={handleEdit}>Edit maintenance</button>
            <button class="button is-small" on:click={handleMaintenanceClose} disabled={maintenanceClosed}>Close maintenance</button>
        </div>
    </div>
{/if}
