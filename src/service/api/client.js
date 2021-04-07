import axios from 'axios';

export const client = axios.create();

client.defaults.baseURL = `http://dev.joljak.kr:8080/api/v1/`;


client.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImNsYXNzT2YiOiJhZG1pbiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwiaWF0IjoxNjE3Njg2MjkyLCJleHAiOjE2MTgwNDYyOTJ9.clPjlwun3u5dqmKG7A6oKra9ED7Scu-Q_ZuVfUV_E1Nl7GUMhnWYK2PtqHMrdDuzM84l1b5JUHCMOEUNaNBYcg`;

axios.defaults.withCredentials = true;

