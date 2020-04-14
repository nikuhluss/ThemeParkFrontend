<script>
    import { user } from '../stores/auth.js';

    $: tagClass = $user.isEmployee ? 'tag is-success' : 'tag is-info';
    $: tagText = $user.isEmployee ? 'Employee' : 'Customer';
</script>

<h1 class="title">Dashboard</h1>
<h2 class="subtitle">Welcome to TPMS</h2>

<div class="content">
    <p>Your current level of access is <span class={tagClass}>{tagText}</span></p>

    <h3 class="title">Sidebar</h3>

    <p>
        On the left you can find the sidebar, use it to navigate the app and find out what
        the Theme Park has to offer.
    </p>
</div>
