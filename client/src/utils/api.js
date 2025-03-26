import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
