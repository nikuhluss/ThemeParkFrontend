<script>
  import { replace } from 'svelte-spa-router';
  import { key, userId, user } from '../stores/auth.js';
  import { makeAxios, makeAxiosWithKey } from '../axios.js';
  import Submit from '../components/Submit.svelte';

  let email = 'customer0@email.com';
  let password = 'password';

  let axios = makeAxios();

  const handleSubmit = async () => {
    try {
      let response = await axios.post('/login', { email, password });
      key.set(response.data.key);
      userId.set(response.data.userId);

      let authAxios = makeAxiosWithKey(response.data.key);
      response = await authAxios.get(`/users/${response.data.userId}`);
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
    email = '';
    password = '';
    key.reset();
  };
</script>

<style>
  .section {
    height: 100%;
    width: 100%;
    padding-top: 100px;
    background-image: url("/img/login_background.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }

  #login_box {
    width: 480px;
    padding: 10px;
    border: 5px solid darkslategrey;
    border-radius: 5px;
    background-color: whitesmoke;
  }

  c2 {
    color: #fcba03;
  }

  img {
    max-width: 100px;
    max-height: 100px;
  }
</style>

<section class="section">

  <div class="container" id="login_box">

    <div class="media">
      <img src="/img/logo.png" alt="logo" class="media-left" />
      <div class="media-content">
        <h1 class="title is-2">
          <em>
            Welcome to <c2>Adventureland!</c2>
          </em>
        </h1>
      </div>

    </div>

    <hr style="border: solid darkslategrey 2px;" />

    <h2 class="title is-3">Login</h2>

    <form class="form">
      <div class="field">
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="user@email.com"
            bind:value={email} />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="Passowrd"
            bind:value={password} />
        </div>
      </div>

      <Submit
        on:submit={handleSubmit}
        on:cancel={handleCancel}
        bulmaSubmitModifier="is-link" />
    </form>
  </div>

</section>
