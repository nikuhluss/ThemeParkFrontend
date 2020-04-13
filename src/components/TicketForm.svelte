<script>
    import Submit from './Submit.svelte'

    export let adultTickets = 0;
    export let kidTickets = 0;
    let purchase_price = 50;
</script>


<form class="form">

    <div class="field">
        <label class="label">${purchase_price}</label>
    </div>

    <div class="field">
        <label class="label">Number of Adult Tickets</label>
        <div class="control">
            <label class="label">
                <input type="number" bind:value={adultTickets} min="0">
                    X  ${purchase_price}
            </label>
        </div>
    </div>

    <div class="field">
        <label class="label">Number of Child Tickets</label>
        <div class="control">
            <label class="label">
                <input type="number" bind:value={kidTickets} min="0">
                    X  ${purchase_price/2}
            </label>
        </div>
    </div>


    <Submit payload={{adultTickets, kidTickets}} on:submit on:cancel />
</form>