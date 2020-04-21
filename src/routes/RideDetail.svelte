<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import dayjs from 'dayjs';
    import { key, user, userId } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    import Modal from '../components/Modal.svelte';
    import Card from '../components/Card.svelte';
    import RideForm from '../components/RideForm.svelte';
    import MaintenanceForm from '../components/MaintenanceForm.svelte';
    import ReviewForm from '../components/ReviewForm.svelte';
    export let params;

    let ride = null;
    let reviews = [];

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get(`/rides/${params.rideId}`);
            ride = response.data;
        } catch (err) {

        }
    });

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response  = await axios.get(`/rides/${params.rideId}/reviews`);
            reviews = response.data;
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
        const newReview = event.detail;
        newReview.rideId = params.rideId;
        newReview.userId = $userId;
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.post('/reviews', newReview);
            reviews = [response.data, ...reviews];
            creatingReview = false;
        } catch (err) {

        }
    };

    // review deletion hndlers

    const handleDeleteReview = async (idx) => {
        const review = reviews[idx];
        if (!review) {
            return;
        }

        if (!confirm('Are you sure you want to delete this review?')) {
            return;
        }

        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.delete(`/reviews/${review.id}`);
            reviews = [...reviews.slice(0, idx), ...reviews.slice(idx + 1)];
        } catch (err) {

        }
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

    {#if creatingReview}
        <Modal title="Write new review" on:close={handleCreateReviewCancel}>
            <div class="box">
                <ReviewForm on:submit={handleCreateReviewSubmit} on:cancel={handleCreateReviewCancel}/>
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
            <div class="columns is-multiline">
                {#each reviews as review, idx}
                    <div class="column is-full">
                        <Card nobutton>
                            <span slot="title">{review.title}</span>
                            <div slot="content">
                                <p>
                                    <strong>Rating: </strong><span>{review.rating}</span>
                                    <br />
                                    <strong>Posted on: </strong><time datetime={review.postedOn}>{dayjs(review.postedOn).format('MM/DD/YYYY h:mm A')}</time>
                                    <br />
                                </p>
                                <p>{review.content}</p>
                                {#if $user && $user.isEmployee}
                                    <p>
                                        <button class="button is-danger is-small is-outlined" on:click={() => handleDeleteReview(idx)}>Delete</button>
                                    </p>
                                {/if}
                            </div>
                        </Card>
                    </div>
                {/each}
            </div>
        </div>

        <div class="column is-two-thirds">
            <h2 class="title">Actions</h2>
            {#if $user && $user.isEmployee}
                <button class="button is-small" on:click={handleEdit}>Edit ride</button>
            {/if}
            <button class="button is-small" on:click={handleCreateReview}>Write new review</button>
            {#if $user && $user.isEmployee}
                <button class="button is-small" on:click={handleCreateMaintenance}>Create new maintenance</button>
            {/if}
        </div>
    </div>
{/if}
