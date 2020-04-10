import axios from 'axios';


const DEFAULT_BASE_URL = 'http://localhost:5000';


export const makeAxios = (key, baseUrl = DEFAULT_BASE_URL) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const makeAxiosWithKey = (key, baseUrl = DEFAULT_BASE_URL) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
  });
};
