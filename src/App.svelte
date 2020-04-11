<script>
	import Router, { wrap, push } from 'svelte-spa-router';
	import Login from './routes/Login.svelte';
	import { key } from './stores/auth.js';

	import Routes from './Routes.svelte';
	import NotFound from './routes/NotFound.svelte';

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

<Router routes={routes} on:conditionsFailed={conditionsFailed} />

<style>
	:global(html) {
		overflow: hidden;
	}
</style>