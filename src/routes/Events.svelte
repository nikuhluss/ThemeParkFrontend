<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import dayjs from 'dayjs';

    import Card from '../components/Card.svelte';
    import { key } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    let events = [];

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get('/events');
            events = response.data;
        } catch (err) {

        }
    });
</script>

<h1 class="title">Events</h1>
<p class="subtitle">Check most recent events</p>

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
