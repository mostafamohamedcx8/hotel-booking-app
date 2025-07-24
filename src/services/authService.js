// src/services/authService.js
import axiosInstance from "../api/axiosInstance";

export const login = async ({ email, password }) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  console.log("🟢 Login response from backend:", response.data);
  return response.data;
};
