<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import dayjs from 'dayjs';

    import Card from '../components/Card.svelte';
    import Modal from '../components/Modal.svelte';
    import AddTicket from '../components/TicketForm.svelte';
    import { key, userId } from '../stores/auth.js';
    import { makeAxiosWithKey } from '../axios.js';

    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();

    let tickets = [];
    let visibleTickets = [];
    let todayTicket = true;

    $: {
        if (todayTicket) {
            visibleTickets = tickets.filter(t => t.isValid);
        } else {
            visibleTickets = tickets;
        }
    };

    onMount(async () => {
        const axios = makeAxiosWithKey($key);
        try {
            const response = await axios.get(`users/${$userId}/tickets`);
            tickets = response.data;
        } catch (err) {
            console.error(err);
            addNotification({type: 'danger', position: 'bottom-right', removeAfter: 4000, text: err.response.data.error});
        }
    });

    // ticket form

    let buyingTicket = false;

    const handleNewTicket = () => {
        buyingTicket = true;
    };

    const handleNewTicketSubmit = async (event) => {
        const ticketInfo = event.detail;
        const ticketsToSubmit = getTicketJSON(ticketInfo);
        const axios = makeAxiosWithKey($key);

        try {
            const responses = await Promise.all(ticketsToSubmit.map(newTicket => axios.post('/tickets', newTicket)));
            const data = responses.map(r => r.data);
            tickets = [...data, ...tickets];
        } catch (err) {
            console.error(err);
            addNotification({type: 'danger', position: 'bottom-right', removeAfter: 4000, text: err.response.data.error});
        }

        buyingTicket = false;
    };

    const handleNewTicketCancel = () => {
        buyingTicket = false;
    };

    const getTicketJSON = (info) => {
        let newTickets = [];

        for(let i = 0; i < info.adultTickets; i++) {
            newTickets.push({
                isKid: false,
                userId: $userId,
                purchasePrice: 50,
                purchaseReference: "076347d-8047-4754-9dcb-f5961709b22d",
            });
        }

        for(let i = 0; i < info.kidTickets; i++) {
            newTickets.push({
                isKid: true,
                userId: $userId,
                purchasePrice: 25,
                purchaseReference: "076347d-8047-4754-9dcb-f5961709b22d",
            });
        }

        return newTickets;
    };

</script>

<h1 class="title">Tickets</h1>
<p class="subtitle">Check tickets</p>

{#if buyingTicket}
    <Modal on:close={handleNewTicketCancel}>
        <div class="box">
            <AddTicket on:submit={handleNewTicketSubmit} on:cancel={handleNewTicketCancel}/>
        </div>
    </Modal>
{/if}

<div class="level">
    <div class="level-left">
        <div class="level-item">
            <button class="button is-primary" on:click={handleNewTicket}>Purchase Ticket(s)</button>
        </div>
        <div class="level-item">
            <label class="checkbox">
                <input type="checkbox" bind:checked={todayTicket}>
                Today's tickets
            </label>
        </div>
    </div>
</div>

<div class="columns is-multiline">

    {#if visibleTickets.length <= 0}
        <div class="column is-full">
            <p>No tickets for today :,(</p>
        </div>
    {:else}
        {#each visibleTickets as ticket}
            <div class="column is-half">
                <Card nobutton>
                    <span slot="title">
                        {ticket.id}
                    </span>
                    <div slot="content">
                        <p>
                            {#if ticket.isValid}
                                <span class="tag is-success">Valid</span>
                            {:else}
                                <span class="tag is-warning">Invalid</span>
                            {/if}
                        </p>
                        <p>
                            <strong>Cost: </strong><span>${ticket.purchasePrice}</span>
                            <br />
                            <strong>Purchased On: </strong><time datetime={ticket.purchasedOn}>{dayjs(ticket.purchasedOn).format('MM/DD/YYYY h:mm A')}</time>
                        </p>
                    </div>
                </Card>
            </div>
        {/each}
    {/if}
</div>
