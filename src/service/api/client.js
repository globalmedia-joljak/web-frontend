import axios from 'axios';

export const client = axios.create();

client.defaults.baseURL = `http://dev.joljak.kr:8080/api/v1/`;
client.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImNsYXNzT2YiOiIxMjM0MTIzNCIsInN1YiI6IkFjY2Vzc1Rva2VuIiwiaWF0IjoxNjE3MDE2NDIzLCJleHAiOjE2NTMwMTY0MjN9.-tlKvXSR1KBc_JJ_NODzm7xFh2VR_-JG0GTRaTGFHb-Vl_cUPqEyltVDDn2UXDBGYyWaqIcWVfZJHeJV4xfF6A`;
