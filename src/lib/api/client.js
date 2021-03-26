import axios from 'axios';

export const client = axios.create();

client.defaults.baseURL = `http://dev.joljak.kr:8080/api/v1/`;
client.defaults.headers.common[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sImNsYXNzT2YiOiJhZG1pbiIsInN1YiI6IkFjY2Vzc1Rva2VuIiwiaWF0IjoxNjE2NzQwNDg5LCJleHAiOjE2MTcxMDA0ODl9.aIbUJl-2ddm2n44g2f9-YuRDZFtIZd7lhqcCfcXXXLDWYh87KcCzgsCOvEPIeCN4F9ie2uJhtjDvdyiI-PujHA`;
