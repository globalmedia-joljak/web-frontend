import axios from 'axios';

export const client = axios.create();

client.defaults.baseURL = `http://dev.joljak.kr:8080/api/v1/`;

client.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImNsYXNzT2YiOiJhZG1pbiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwiaWF0IjoxNjE3MjgwODkzLCJleHAiOjE2MTc2NDA4OTN9.3rauu2hO4nOlIvC_OMZb9aPKL5T3zE1PJRdM7x5USsJfAQrBgxc1VUPPFA13WSAyIeEY_ovkzm3xJeZxO9-vsw`;
