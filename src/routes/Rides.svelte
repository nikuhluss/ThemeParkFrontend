<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';

    import Card from '../components/Card.svelte';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();

    let rides = [];

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get('/rides');
            rides = response.data;
        } catch (err) {
            console.error(err);
            addNotification({type: 'danger', position: 'bottom-right', removeAfter: 4000, text: err.response.data.error});
        }
    });

    const handleClick = (e, rideId) => {
        e.preventDefault();
        push(`/dashboard/rides/${rideId}`);
    };
</script>

<h1 class="title">Rides</h1>
<p class="subtitle">Check our main rides</p>

<div class="columns is-multiline">

    {#each rides as ride}
        <div class="column is-one-third">
            <Card on:click={e => handleClick(e, ride.id)}>
                <span slot="title">
                    {ride.name}
                </span>
                <p slot="content">
                    {ride.description}
                </p>
            </Card>
        </div>
    {/each}
</div>
