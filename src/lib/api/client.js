import axios from 'axios';

let client = axios.create();

client.defaults.baseURL = 'http://dev.joljak.kr:8080/api/v1/';

client.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImNsYXNzT2YiOiJhZG1pbiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwiaWF0IjoxNjE2NDc3MzUzLCJleHAiOjE2MTY4MzczNTN9.9xg4wAXyfo9dsgTbPZSZhsg79J8m6llqhujA9QEcCs43L7bO-iwOlQyai9mE5x5RzEk0yVVpW8WKQYUnLe1u-g`;

export default client;
