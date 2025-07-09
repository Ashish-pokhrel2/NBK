import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Updated to match backend port
  // You can add headers here if needed, e.g.:
   headers: { 'Content-Type': 'application/json' }
});

export default instance;


