import axios from 'axios';


const BASE_URL = 'http://localhost:5000';


export const makeAxios = (key) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const makeAxiosWithKey = (key) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
  });
};
