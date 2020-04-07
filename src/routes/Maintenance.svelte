<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import dayjs from 'dayjs';

    import Card from '../components/Card.svelte';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    let maintenanceJobs = [];
    let visibleMaintenanceJobs = [];
    let openOnly = true;

    $: {
        if (openOnly) {
            visibleMaintenanceJobs = maintenanceJobs.filter(m => !m.end);
        } else {
            visibleMaintenanceJobs = maintenanceJobs;
        }
    };

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get('/maintenance');
            maintenanceJobs = response.data;
        } catch (err) {
            console.error(err);
        }
    });

    const handleClick = (e, rideId) => {
        e.preventDefault();
        push(`/dashboard/maintenance/${rideId}`);
    };
</script>

<h1 class="title">Maintenance</h1>
<p class="subtitle">Check pending maintenance jobs</p>

<div class="level">
    <div class="level-left">
        <div class="level-item">
            <label class="checkbox">
                <input type="checkbox" bind:checked={openOnly}>
                Open only
            </label>
        </div>
    </div>
</div>

<div class="columns is-multiline">

    {#if visibleMaintenanceJobs.length <= 0}
        <div class="column is-full">
            <p>No pending maintenance jobs ;)</p>
        </div>
    {:else}
        {#each visibleMaintenanceJobs as maintenance}
            <div class="column is-half">
                <Card on:click={e => handleClick(e, maintenance.id)}>
                    <span slot="title">
                        {maintenance.rideName}
                    </span>
                    <div slot="content">
                        <p>{maintenance.description}</p>
                        <strong>Type: </strong><span>{maintenance.maintenanceType}</span>
                        <br />
                        <strong>Cost: </strong><span>${maintenance.cost}</span>
                        <br />
                        <strong>Start date: </strong><time datetime={maintenance.start}>{dayjs(maintenance.start).format('MM/DD/YYYY h:mm A')}</time>
                        <br />
                        <strong>End date: </strong><time datetime={maintenance.end}>{dayjs(maintenance.end).format('MM/DD/YYYY h:mm A')}</time>
                    </div>
                </Card>
            </div>
        {/each}
    {/if}
</div>
