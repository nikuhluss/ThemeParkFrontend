import { writable, derived } from 'svelte/store';
import { makeAxios, makeAxiosWithKey } from '../axios';


const createValue = (key, defaultValue) => {

  let initialValue = defaultValue;
  try {
    initialValue = JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.log("removed invalid local storage value for: " + key);
    localStorage.removeItem(key);
  }

  const { subscribe, set } = writable(initialValue);

  return {
    subscribe,

    set: value => {
      localStorage.setItem(key, JSON.stringify(value));
      set(value);
    },

    reset: () => {
      localStorage.removeItem(key);
      set(defaultValue);
    },
  };
};


export const key = createValue('key', null);
export const user = createValue('user', null);
export const userId = derived(user, $user => $user && $user.id || null);
