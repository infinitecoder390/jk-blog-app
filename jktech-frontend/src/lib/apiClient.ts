import axios from "axios";
import { getEnv } from "./utils";
// Get the base URL from environment variables
const apiClient = axios.create({
  baseURL: getEnv("VITE_API_URL"), // Dynamically set base URL from the .env file
  timeout: 10000, // Optional: Set timeout for requests
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or any other headers here if needed
    const token = localStorage.getItem("token"); // Replace with your actual token retrieval logic
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // You can modify the response before it gets to the components if needed
    return response;
  },
  (error) => {
    // Handle errors globally here, such as redirecting on 401
    if (error.response && error.response.status === 401) {
      // For example, redirect the user to login on 401 Unauthorized
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
