<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let nobutton = false;
</script>

<div class="card">
    <header class="card-header">
        <p class="card-header-title">
            <slot name="title">Title</slot>
        </p>
    </header>

    <div class="card-content">
        <div class="content">
            <slot name="content">Content</slot>
        </div>
    </div>

    {#if !nobutton}
        <footer class="card-footer">
            <a href='#something' class="card-footer-item" on:click>Details</a>
        </footer>
    {/if}
</div>
