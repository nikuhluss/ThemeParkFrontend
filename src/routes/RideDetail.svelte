<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    import Modal from '../components/Modal.svelte';
    import RideForm from '../components/RideForm.svelte';
    import MaintenanceForm from '../components/MaintenanceForm.svelte';

    export let params;

    let ride = null;

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get(`/rides/${params.rideId}`);
            ride = response.data;
        } catch (err) {

        }
    });

    // editing ride handlers

    let editing = false;

    const handleEdit = () => {
        editing = true;
    };

    const handleEditCancel = () => {
        editing = false;
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

    // maintenance creation handlers

    let creatingMaintenance = false;

    const handleCreateMaintenance = () => {
        creatingMaintenance = true;
    };

    const handleCreateMaintenanceCancel = () => {
        creatingMaintenance = false;
    };

    const handleCreateMaintenanceSubmit = async (event) => {
        const maintenanceInfo = event.detail;
        const newMaintenance = {rideId: ride.id, ...maintenanceInfo};
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.post('/maintenance', newMaintenance);
            push(`/dashboard/maintenance/${response.data.id}`);
        } catch (err) {

        }
    };

    // review creation handlers

    let creatingReview = false;

    const handleCreateReview = () => {
        creatingReview = true;
    };

    const handleCreateReviewCancel = () => {
        creatingReview = false;
    };

    const handleCreateReviewSubmit = async (event) => {
        const reviewInfo = event.detail;
    };

</script>

{#if !ride}
    Loading...
{:else}

    {#if editing}
        <Modal title="Edit ride" on:close={handleEditCancel}>
            <div class="box">
                <RideForm {...ride} on:submit={handleEditSubmit} on:cancel={handleEditCancel} />
            </div>
        </Modal>
    {/if}

    {#if creatingMaintenance}
        <Modal title="Create new maintenance job" on:close={handleCreateMaintenanceCancel}>
            <div class="box">
                <MaintenanceForm  on:submit={handleCreateMaintenanceSubmit} on:cancel={handleCreateMaintenanceCancel} />
            </div>
        </Modal>
    {/if}

    <h1 class="title">{ride.name}</h1>
    <p class="subtitle">
        <span class="tag">Age: {ride.minAge}+ yo</span>
        <span class="tag">Height: {ride.minHeight}+ cm</span>
    </p>

    <div class="content">
        <p>{ride.description}</p>
    </div>

    <div class="columns is-multiline">
        <div class="column is-one-third">
            <h2 class="title">Reviews</h2>
            <p class="subtitle"><strong>Average rating:</strong> {ride.reviewsAverage}</p>
        </div>

        <div class="column is-two-thirds">
            <h2 class="title">Actions</h2>
            <button class="button is-small" on:click={handleEdit}>Edit ride</button>
            <button class="button is-small" on:click={handleCreateMaintenance}>Create new maintenance</button>
        </div>
    </div>
{/if}
