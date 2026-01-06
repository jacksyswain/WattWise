import axios from "axios";

/* =====================
   AXIOS INSTANCE
===================== */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* =====================
   REQUEST INTERCEPTOR
   Attach JWT Token
===================== */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================
   AUTH APIS
===================== */
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);

/* =====================
   ENERGY APIS
===================== */
export const fetchLivePower = (deviceId) =>
  API.get(`/live-power?deviceId=${deviceId}`);

export const fetchTodayUsage = (deviceId) =>
  API.get(`/usage/today?deviceId=${deviceId}`);

export const fetchMonthlyBill = (deviceId) =>
  API.get(`/billing/monthly?deviceId=${deviceId}`);

export const fetchMonthlyChart = (deviceId) =>
  API.get(`/chart/monthly?deviceId=${deviceId}`);

/* =====================
   OPTIONAL: LOGOUT
===================== */
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export default API;
