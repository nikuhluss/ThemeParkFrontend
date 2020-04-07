<script>
    import { replace } from 'svelte-spa-router';
    import { key, userId, user } from '../stores/auth.js';
    import { makeAxios, makeAxiosWithKey } from '../axios.js';

    let email = "employee0@email.com";
    let password = "password";

    let axios = makeAxios();

    const handleSubmit = async () => {

        try {

            let response = await axios.post('/login', {email, password})
            key.set(response.data.key);
            userId.set(response.data.userId);

            let authAxios = makeAxiosWithKey(response.data.key);
            response = await authAxios.get(`/users/${response.data.userId}`)
            user.set(response.data);

            replace('/dashboard');

        } catch (err) {
            console.log(err);
            alert("Login failed");
        }
    };

    const handleCancel = () => {
        email = "";
        password = "";
        key.reset();
    };
</script>

<section class="section">
    <div class="container">
        <h1 class="title">Login</h1>

        <div class="field">
            <div class="control">
                <input class="input" type="email" placeholder="user@email.com" bind:value={email} />
            </div>
        </div>

        <div class="field">
            <div class="control">
                <input class="input" type="password" placeholder="Passowrd" bind:value={password} />
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" on:click={handleSubmit}>Submit</button>
            </div>
            <div class="control">
                <button class="button is-link is-light" on:click={handleCancel}>Cancel</button>
            </div>
        </div>
    </div>
</section>

<style>
    .container {
        max-width: 480px;
    }
</style>
