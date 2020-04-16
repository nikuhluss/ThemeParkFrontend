<script>
    import { replace } from 'svelte-spa-router';
    import { key, userId, user } from '../stores/auth.js';
    import { makeAxios, makeAxiosWithKey } from '../axios.js';
    import Submit from '../components/Submit.svelte';

    let email = "customer0@email.com";
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
            if (err.response && err.response.status == 401) {
                alert("Invalid username or password");
            } else if (err.response) {
                alert("Unknown server error, please contact administrator");
            } else {
                alert("Could not connect to server");
            }
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

        <form class="form">
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

            <Submit on:submit={handleSubmit} on:cancel={handleCancel} bulmaSubmitModifier='is-link' />
        </form>
    </div>
</section>

<style>
    .container {
        max-width: 480px;
    }
</style>
