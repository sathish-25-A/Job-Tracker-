import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // Add token to headers if available
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Log the request headers for debugging purposes
    console.log("Request Headers:", config.headers);

    // Dynamically set Content-Type for file uploads (multipart/form-data)
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error to console for debugging
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default API;
