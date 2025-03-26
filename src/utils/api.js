import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // Include cookies for authentication
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Automatically handle JSON responses & errors
api.interceptors.response.use(
  (response) => response.data, // Extract JSON data automatically
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
