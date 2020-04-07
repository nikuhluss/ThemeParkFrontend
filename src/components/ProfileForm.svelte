<script>

    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    let availableGenders = [
        {id: 'Female', value: 'Female'},
        {id: 'Male', value: 'Male'},
        {id: 'Other', value: 'Other'},
    ];

    export let firstName = null;
    export let lastName = null;
    export let gender = 'Other';
    // export let dateOfBirth = null;
    export let address = null;
    export let phone = null;

    const handleSubmit = () => {
        dispatch('submit', {firstName, lastName, gender, address, phone});
    };

    const handleCancel = () => {
        dispatch('cancel');
    };

</script>

<form class="form" on:submit={handleSubmit}>
    <div class="field">
        <label class="label">First name</label>
        <div class="control">
            <input class="input" type="text" placeholder="First name" bind:value={firstName} />
        </div>
    </div>

    <div class="field">
        <label class="label">Last name</label>
        <div class="control">
            <input class="input" type="text" placeholder="Last name" bind:value={lastName} />
        </div>
    </div>

    <div class="field">
        <label class="label">Gender</label>
        <div class="control">
            <div class="select">
                <select bind:value={gender}>
                    {#each availableGenders as gender}
                        <option value={gender.id}>{gender.value}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>

    <div class="field">
        <label class="label">Address</label>
        <div class="control">
            <input class="input" type="text" placeholder="Address" bind:value={address} />
        </div>
    </div>

    <div class="field">
        <label class="label">Phone number</label>
        <div class="control">
            <input class="input" type="text" placeholder="Phone number" bind:value={phone} />
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