<script>
	import Router, { link, push } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';

    import Events from './routes/Events.svelte';
    import Home from './routes/Home.svelte';
    import Maintenance from './routes/Maintenance.svelte';
    import MaintenanceDetail from './routes/MaintenanceDetail.svelte';
    import Profile from './routes/Profile.svelte';
    import RideDetail from './routes/RideDetail.svelte';
    import Rides from './routes/Rides.svelte';

	import { key, user } from './stores/auth.js';

    const prefix = '/dashboard';

    const routes = {
    '/': Home,
    '/rides/:rideId': RideDetail,
    '/rides': Rides,
    '/maintenance/:maintenanceId': MaintenanceDetail,
    '/maintenance': Maintenance,
    '/events': Events,
	'/profile': Profile,
    };

	let pageItems = [
		{route: '/dashboard', value: 'Home'},
		{route: '/dashboard/rides', value: 'Rides'},
		{route: '/dashboard/maintenance', value: 'Maintenance'},
		{route: '/dashboard/events', value: 'Events'},
	];

	let otherItems = [
		{route: '/dashboard/profile', value: 'Profile'},
	];

	const handleLogOut = () => {
		key.reset();
		push('/login');
	};

	console.log(">", $user);
</script>

<div class="columns">


	<div class="sidebar column is-one-fifth is-fullheight">


		<div class="tpms">
			<h1 class="title">TPMS</h1>
			<h2 class="subtitle">Theme park management system</h2>
		</div>

		<aside class="menu">
			<p class="menu-label">
				Pages
			</p>
			<ul class="menu-list">
				{#each pageItems as item}
					<a href="{item.route}" use:link use:active={{className: 'is-active'}}>{item.value}</a>
				{/each}
			</ul>
			<p class="menu-label">
				Other
			</p>
			<ul class="menu-list">
				{#each otherItems as item}
					<a href="{item.route}" use:link use:active={{className: 'is-active'}}>{item.value}</a>
				{/each}
			</ul>
		</aside>


		{#if $user}
		<div class="user">
			<p>{$user.firstName} {$user.lastName}</p>
			<button class="button is-danger is-light is-small" on:click={handleLogOut}>Log out</button>
		</div>
		{/if}

	</div>

	<div class="column">
		<main>
			<Router routes={routes} prefix={prefix} />
		</main>
	</div>
</div>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
		overflow: hidden;
	}

	.user {
		padding: 1em;
	}

	.user p {
		font-weight: bold;
	}

	.tpms, aside, main {
		padding: 1em;
	}

	.is-fullheight {
		height: 100vh;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
	}

	.sidebar .tpms {
		flex-basis: content;
	}

	.sidebar .menu {
		flex-grow: 1;
	}

	.sidebar .user {
		flex-basis: content;
	}

	main {
		padding-top: 4em;
		height: 100vh;
		overflow: auto;
	}
</style>
