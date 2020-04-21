<script>
	import Router, { wrap, push } from 'svelte-spa-router';
	import Notifications from 'svelte-notifications';
	import { key } from './stores/auth.js';

	import CustomNotification from './components/CustomNotification.svelte';
	import Home from './routes/Home.svelte';
	import NotFound from './routes/NotFound.svelte';
	import Login from './routes/Login.svelte';
	import Routes from './Routes.svelte';

	// pre-conditions

	const preconditionLogin = (detail) => {
		if (!$key) {
			detail.loggedIn = false;
			return false;
		}
		detail.loggedIn = true;
		return true;
	};

	const preconditions = [
		preconditionLogin,
	];

	// routes

	const routes = {
		'/': Home,
		'/login': Login,
		'/dashboard': wrap(Routes, ...preconditions),
		'/dashboard/*': wrap(Routes, ...preconditions),
		'*': NotFound,
	};

	// events

	const conditionsFailed = (detail) => {
		if (!detail.loggedIn) {
			push('/login');
		}
	};

</script>

<Notifications item={CustomNotification}>
	<Router routes={routes} on:conditionsFailed={conditionsFailed} />
</Notifications>

<style>
	:global(html) {
		overflow: hidden;
	}

	:global(.notifications) {
		/* fix z-index to appear on top of modals */
		position: relative;
		z-index: 40;
	}
</style>