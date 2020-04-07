<script>
    import Submit from './Submit.svelte';

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
</script>

<form class="form">
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

    <Submit payload={{firstName, lastName, gender, address, phone}} on:submit on:cancel />
</form>
