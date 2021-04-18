import axios from 'axios';

export const client = axios.create();

client.defaults.baseURL = `http://localhost:8080/api/v1/`;

axios.defaults.withCredentials = true;
