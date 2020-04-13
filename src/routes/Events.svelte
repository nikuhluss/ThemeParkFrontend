<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import dayjs from 'dayjs';

    import Modal from '../components/Modal.svelte';
    import Card from '../components/Card.svelte';
    import AddEvent from '../components/EventForm.svelte';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    let events = [];
    let addingEvent = false;

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get('/events');
            events = response.data;
        } catch (err) {

        }
    });

    const handleNewEvent = () => {
        addingEvent = true;
    };

    const handleNewEventSubmit = async (event) => {
        const eventInfo = event.detail;
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.post(`/events`, eventInfo);
            events = [response.data, ...events];
            addingEvent = false;
        } catch (err) {
        }
    };



    const handleNewEventCancel = () => {
        addingEvent = false;
    };

</script>

<h1 class="title">Events</h1>
<p class="subtitle">Check most recent events</p>

{#if addingEvent}
    <Modal on:close={handleNewEventCancel}>
        <div class="box">
            <AddEvent on:submit={handleNewEventSubmit} on:cancel={handleNewEventCancel}/>
        </div>
    </Modal>
{/if}

<div class="level">
    <div class="level-left">
        <div class="level-item">
            <button class="button is-primary" on:click={handleNewEvent}>Create new event</button>
        </div>
    </div>
</div>

<div class="columns is-multiline">
    {#if events.length <= 0}
        <div class="column is-full">
            <p>No events.</p>
        </div>
    {:else}
        {#each events as event}
            <div class="column is-full">
                <Card nobutton>
                    <span slot="title">
                        {event.title}
                    </span>
                    <div slot="content">
                        <p>{event.description}</p>
                        <strong>Type: </strong><span>{event.eventType}</span>
                        <br />
                        <strong>Posted on: </strong><time datetime={event.postedOn}>{dayjs(event.postedOn).format('MM/DD/YYYY h:mm A')}</time>
                    </div>

                </Card>
            </div>
        {/each}
    {/if}
</div>
