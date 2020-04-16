import axios from 'axios';


const DEFAULT_BACKEND_BASE_URL = 'http://' + process.env.BACKEND_HOST;


export const makeAxios = (key, baseUrl = DEFAULT_BACKEND_BASE_URL) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const makeAxiosWithKey = (key, baseUrl = DEFAULT_BACKEND_BASE_URL) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
  });
};

