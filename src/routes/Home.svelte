<script>
    import { onMount } from 'svelte';
    import { replace } from 'svelte-spa-router';

    onMount(() => {
        replace('/dashboard');
    });
</script>
