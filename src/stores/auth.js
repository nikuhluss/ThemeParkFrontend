import { writable, derived } from 'svelte/store';
import { makeAxios, makeAxiosWithKey } from '../axios';


const createValue = (defaultValue) => {
  const { subscribe, set } = writable(defaultValue);

  return {
    subscribe,
    set: value => set(value),
    reset: () => set(defaultValue),
  };
};


export const key = createValue(null);
export const userId = createValue(null);
export const user = createValue(null);
