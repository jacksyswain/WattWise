import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchLivePower = (deviceId) =>
  API.get(`/live-power?deviceId=${deviceId}`);

export const fetchTodayUsage = (deviceId) =>
  API.get(`/usage/today?deviceId=${deviceId}`);

export const fetchMonthlyBill = (deviceId) =>
  API.get(`/billing/monthly?deviceId=${deviceId}`);

export const fetchMonthlyChart = (deviceId) =>
  API.get(`/chart/monthly?deviceId=${deviceId}`);
