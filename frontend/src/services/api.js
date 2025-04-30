// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // ✅ Corrected key

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    console.log("Request Headers:", config.headers);

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
