<script>
	import Router, { link, push, wrap } from 'svelte-spa-router';
	import active from 'svelte-spa-router/active';

	import Dashboard from './routes/Dashboard.svelte';
	import Events from './routes/Events.svelte';
	import Home from './routes/Home.svelte';
	import Maintenance from './routes/Maintenance.svelte';
	import MaintenanceDetail from './routes/MaintenanceDetail.svelte';
	import NotFound from './routes/NotFound.svelte';
	import Profile from './routes/Profile.svelte';
	import Reports from './routes/Reports.svelte';
	import RideDetail from './routes/RideDetail.svelte';
	import Rides from './routes/Rides.svelte';
	import ScanSim from './routes/ScanSim.svelte';
	import Tickets from './routes/Tickets.svelte';

	import { key, user } from './stores/auth.js';

	const prefix = '/dashboard';

	const employeePrecondition = (detail) => {
		return $user.isEmployee;
	};

	const routes = {
		'/': Dashboard,
		'/reports': wrap(Reports, employeePrecondition),
		'/rides/:rideId': RideDetail,
		'/rides': Rides,
		'/maintenance/:maintenanceId': wrap(MaintenanceDetail, employeePrecondition),
		'/maintenance': wrap(Maintenance, employeePrecondition),
		'/events': Events,
		'/tickets': Tickets,
		'/scansim': ScanSim,
		'/profile': Profile,
		'/*': NotFound,
	};

	let mainItems = [
		{route: '/dashboard', value: 'Home', requiresEmployee: false},
	];

	let pageItems = [
		{route: '/dashboard/reports', value: 'Reports', requiresEmployee: true},
		{route: '/dashboard/rides', value: 'Rides', requiresEmployee: false},
		{route: '/dashboard/maintenance', value: 'Maintenance', requiresEmployee: true},
		{route: '/dashboard/events', value: 'Events', requiresEmployee: false},
		{route: '/dashboard/tickets', value: 'Tickets', requiresEmployee: false},
	];

	let otherItems = [
		{route: '/dashboard/scansim', value: 'Scan simulation', requiresEmployee: false},
		{route: '/dashboard/profile', value: 'Profile', requiresEmployee: false},
	];

	const handleLogOut = () => {
		key.reset();
		user.reset();
		push('/login');
	};
</script>

<div class="columns">


	<div class="sidebar column is-one-fifth is-fullheight">


		<div class="tpms">
			<h1 class="title">TPMS</h1>
			<h2 class="subtitle">Theme park management system</h2>
		</div>

		<aside class="menu">
			<p class="menu-label">Main</p>
			<ul class="menu-list">
				{#each mainItems as item}
					{#if !item.requiresEmployee || item.requiresEmployee && $user && $user.isEmployee}
						<a href="{item.route}" use:link use:active={{className: 'is-active'}}>{item.value}</a>
					{/if}
				{/each}
			</ul>

			<p class="menu-label">Pages</p>
			<ul class="menu-list">
				{#each pageItems as item}
					{#if !item.requiresEmployee || item.requiresEmployee && $user && $user.isEmployee}
						<a href="{item.route}" use:link use:active={{className: 'is-active'}}>{item.value}</a>
					{/if}
				{/each}
			</ul>

			<p class="menu-label">Other</p>
			<ul class="menu-list">
				{#each otherItems as item}
					{#if !item.requiresEmployee || item.requiresEmployee && $user && $user.isEmployee}
						<a href="{item.route}" use:link use:active={{className: 'is-active'}}>{item.value}</a>
					{/if}
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
