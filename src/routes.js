import { wrap } from 'svelte-spa-router';

import Events from './routes/Events.svelte';
import Home from './routes/Home.svelte';
import Login from './routes/Login.svelte';
import Maintenance from './routes/Maintenance.svelte';
import Rides from './routes/Rides.svelte';
import RideDetail from './routes/RideDetail.svelte';
import NotFound from './routes/NotFound.svelte';
import Routes from './Routes.svelte';

import { key } from './stores/auth.js';


let keyValue = undefined;
key.subscribe((value) => {
  keyValue = value;
});

const preConditionLogin = (detail) => {
  return true;
};

export const preConditions = [
  preConditionLogin,
];

export const routes = {
  '/login': Login,
  '/dashboard*': wrap(Routes, ...preConditions),
  '*': NotFound,
};
