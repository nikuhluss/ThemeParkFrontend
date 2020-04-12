<script>
    import { onMount, tick } from 'svelte';
    import { key, userId } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';
    import Submit from '../components/Submit.svelte';

    let rides = [];
    let tickets = [];

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get('/rides');
            rides = response.data;
        } catch (err) {

        }
    });

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get(`/users/${$userId}/tickets`);
            tickets = response.data.filter(ticket => ticket.isValid);
            // const response = await axios.get('/tickets');
            // tickets = response.data.slice(0, 10);
            if (tickets.length > 0) {
                currTicket = tickets[0];
            }
        } catch (err) {

        }
    });

    // form

    const NO_TICKET = 'no-ticket';
    const RANDOM_RIDE = 'random-ride';
    const EMPTY_RESULT = 'Nothing to show...';

    let currTicket;
    let currRide;
    let currScans;
    let currResult;
    let textarea;

    const reset = () => {
        currTicket = NO_TICKET;
        currRide = RANDOM_RIDE;
        currScans = 10;
        currResult = EMPTY_RESULT;
    };

    reset();

    // submission

    let isSubmitting = false;

    const handleCancel = () => {
        isSubmitting = false;
    };

    const appendResultLine = (line) => {
        currResult = currResult + '\n' + line;
    };

    const scrollTextareaToBottom = () => {
        textarea.scrollTop = textarea.scrollHeight;
    };

    const handleSubmit = async () => {

        const axios = makeAxiosWithKey($key);

        isSubmitting = true;
        await tick();
        currResult = 'Starting submission...';

        const totalIterations = currScans;
        for (let idx = 0; idx < totalIterations; idx++) {

            if (!isSubmitting) {
                appendResultLine("CANCELLED");
                break;
            }

            const ticket = currTicket;
            const ride = currRide === RANDOM_RIDE ? rides[Math.floor(Math.random() * rides.length)] : currRide;

            try {
                const response = await axios.post(`/scans/${ticket.id}/on/${ride.id}`);
                appendResultLine(`OK (idx ${idx}) - Submitted ticket scan on ride ${ride.name}`);
                scrollTextareaToBottom();

            } catch (err) {
                appendResultLine(`ERROR (idx ${idx}) - ${err}`);
                scrollTextareaToBottom();
                break;
            }
        }

        appendResultLine('Finished!');
        await tick();
        scrollTextareaToBottom();
        isSubmitting = false;
    };
</script>

<h1 class="title">Scan simulator</h1>
<h2 class="subtitle">Create scans through the JSON API</h2>


<div class="columns">
    <div class="column is-one-third">
        <form class="form">

            <div class="field">
                <div class="control">
                    <button class="button" on:click={reset}>Clear form</button>
                </div>
            </div>

            <div class="field">
                <label class="label">Ticket</label>
                <div class="control">
                    <select class="select" bind:value={currTicket}>
                        <option value={NO_TICKET}>No ticket selected</option>
                        {#each tickets as ticket}
                            <option value={ticket}>{ticket.purchasedOn} - {ticket.id}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label">Ride</label>
                <div class="control">
                    <select class="select" bind:value={currRide}>
                        <option value={RANDOM_RIDE}>Random</option>
                        {#each rides as ride}
                            <option value={ride}>{ride.name}</option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label">Scans to submit</label>
                <div class="control">
                    <input class="input" type="number" bind:value={currScans} min={1} max={100} />
                    <input class="input" type="range" bind:value={currScans} min={1} max={100} />
                </div>
            </div>

            <Submit on:submit={handleSubmit} on:cancel={handleCancel} disabled={isSubmitting} />
        </form>
    </div>

    <div class="column is-two-thirds">
        <h2 class="title">Results</h2>
        <textarea class="textarea" bind:value={currResult} bind:this={textarea} readonly></textarea>
    </div>
</div>

<style>
    textarea {
        height: 480px;
        color: #444;
        font-size: 0.9rem;
    }
</style>