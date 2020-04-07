<script>
    import { onMount } from 'svelte';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    import Modal from '../components/Modal.svelte';
    import RideForm from '../components/RideForm.svelte';

    export let params;

    let ride = null;
    let editing = false;

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get(`/rides/${params.rideId}`);
            ride = response.data;
        } catch (err) {

        }
    });

    const handleEdit = () => {
        editing = true;
    };

    const handleEditSubmit = async (event) => {
        const rideInfo = event.detail;
        const updatedRide = {...ride, ...rideInfo};
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.put(`/rides/${params.rideId}`, updatedRide);
            ride = response.data;
            editing = false;
        } catch (err) {

        }
    };

    const handleEditCancel = () => {
        editing = false;
    };

    const handleModalClose = () => {
        editing = false;
    };

</script>

{#if !ride}
    Loading...
{:else}

    {#if editing}
        <Modal on:close={handleEditCancel}>
            <div class="box">
                <RideForm {...ride} on:submit={handleEditSubmit} on:cancel={handleEditCancel} />
            </div>
        </Modal>
    {/if}

    <h1 class="title">{ride.name}</h1>
    <p class="subtitle">
        {ride.description}
        <br />
        <span class="tag">Age: {ride.minAge}+ yo</span>
        <span class="tag">Height: {ride.minHeight}+ cm</span>
        <br />
        <button class="button is-small" on:click={handleEdit}>Edit</button>
    </p>

    <div class="columns is-multiline">
        <div class="column is-one-third">
            <h2 class="title">Reviews</h2>
            <p class="subtitle"><strong>Average rating:</strong> {ride.reviewsAverage}</p>
        </div>

        <div class="column is-two-thirds">
            <h2 class="title">Maintenance</h2>
            <p class="subtitle">Recent maintenance jobs</p>
            <button class="button is-small">Start new maintenance</button>
        </div>
    </div>
{/if}
