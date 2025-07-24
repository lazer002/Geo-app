import axios from "axios";

const api = axios.create({
  baseURL: "https://example.com/api", // 🔁 Replace this with your actual backend URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
