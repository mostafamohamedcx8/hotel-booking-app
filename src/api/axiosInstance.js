import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hotel-api-v1.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor لإضافة Authorization Header
axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
