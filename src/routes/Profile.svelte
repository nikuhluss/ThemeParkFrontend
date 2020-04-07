<script>

    import { key, userId, user } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    import Modal from '../components/Modal.svelte';
    import ProfileForm from '../components/ProfileForm.svelte';

    let editing = false;

    const availableGenders = [
        {id: "Female", value: "Female"},
        {id: "Male", value: "Male"},
        {id: "Other", value: "Other"},
    ];

    // handlers

    const handleEdit = () => {
        editing = true;
    };

    const handleEditSubmit = async (event) => {
        const profileInfo = event.detail;
        const updatedProfile = {...$user, ...profileInfo}
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.put(`/users/${$userId}`, updatedProfile);
            user.set(response.data);
            editing = false;
        } catch (err) {
        }
    };

    const handleEditCancel = () => {
        editing = false;
    };

</script>


<div class="container">

    <h1 class="title">Profile</h1>

    {#if !user}
        <p>Not logged in.</p>
    {:else}

        {#if editing}
            <Modal on:close={handleEditCancel}>
                <div class="box">
                    <ProfileForm {...$user} on:submit={handleEditSubmit} on:cancel={handleEditCancel} />
                </div>
            </Modal>
        {/if}

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Email</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input is-static" type="email" value="{$user.email}" readonly />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">First name</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input is-static" type="text" bind:value="{$user.firstName}" readonly>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Last name</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input is-static" type="text" bind:value="{$user.lastName}" readonly>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Gender</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input is-static" type="text" value="{$user.gender}" readonly />
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Address</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" bind:value="{$user.address}" readonly={!editing} class:is-static={!editing}>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Phone</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" bind:value="{$user.phone}" readonly={!editing} class:is-static={!editing}>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <button class="button" on:click={handleEdit}>Edit</button>
                    </div>
                </div>
            </div>
        </div>

    {/if}
</div>