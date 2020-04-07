<script>
    import Submit from './Submit.svelte';

    export let rating = 5;
    export let title = '';
    export let content = '';
</script>

<form class="form">
    <div class="field">
        <label class="label">Rating</label>
        <div class="control">
            <input class="input" type="number" placeholder="Rating" min=1 max=5 bind:value={rating} />
        </div>
    </div>

    <div class="field">
        <label class="label">Title</label>
        <div class="control">
            <input class="input" type="text" placeholder="Title" bind:value={title} />
        </div>
    </div>

    <div class="field">
        <label class="label">Content</label>
        <div class="control">
            <textarea class="textarea" placeholder="Content" bind:value={content} />
        </div>
    </div>

    <Submit payload={{rating, title, content}} on:submit on:cancel />
</form>