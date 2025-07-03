import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // your backend base URL
  // You can add headers here if needed, e.g.:
  // headers: { 'Content-Type': 'application/json' }
});

export default instance;
