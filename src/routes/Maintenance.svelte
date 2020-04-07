<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';

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

    const fetchMaintenanceJobs = async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get('/maintenance');
            maintenanceJobs = response.data;
        } catch (err) {
            console.error(err);
        }
    };

    onMount(fetchMaintenanceJobs);

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

    {#each visibleMaintenanceJobs as maintenance}
        <div class="column is-half">
            <Card on:click={e => handleClick(e, maintenance.id)}>
                <span slot="title">
                    {maintenance.rideName}
                </span>
                <div slot="content">
                    <p>{maintenance.description}</p>
                    <strong>Start date: </strong><time datetime={maintenance}>{maintenance.start}</time>
                    <br />
                    <strong>End date: </strong><time datetime={maintenance}>{maintenance.end}</time>
                </div>
            </Card>
        </div>
    {/each}
</div>
