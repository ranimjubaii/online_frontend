import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Swap to your current active backend server port setup
});

// Request interceptor to automatically provide auth headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;