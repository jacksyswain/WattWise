import { useEffect, useState } from "react";
import {
  fetchLivePower,
  fetchTodayUsage,
  fetchMonthlyBill,
  fetchMonthlyChart,
} from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DEVICE_ID = "METER001";

export default function Dashboard() {
  const [livePower, setLivePower] = useState(0);
  const [todayUsage, setTodayUsage] = useState(0);
  const [monthUsage, setMonthUsage] = useState(0);
  const [bill, setBill] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  /* 🔴 Live power polling (every 3 sec) */
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetchLivePower(DEVICE_ID);
        setLivePower(res.data.livePower ?? 0);
      } catch (err) {
        console.error("Live power error", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* 🔵 Load daily / monthly data */
  useEffect(() => {
    async function loadData() {
      try {
        const todayRes = await fetchTodayUsage(DEVICE_ID);
        setTodayUsage(todayRes.data.todayUsage ?? 0);

        const billRes = await fetchMonthlyBill(DEVICE_ID);
        setMonthUsage(billRes.data.monthUsage ?? 0);
        setBill(billRes.data.estimatedBill ?? 0);

        const chartRes = await fetchMonthlyChart(DEVICE_ID);
        setChartData(chartRes.data.data ?? []);
      } catch (err) {
        console.error("Dashboard load error", err);
      }
    }

    loadData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">⚡ Energy Dashboard</h1>

      {/* ================= CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Live Power" value={`${livePower} kWh`} />
        <Card title="Today Usage" value={`${todayUsage} units`} />
        <Card title="This Month Usage" value={`${monthUsage} units`} />

        {/* Estimated Bill + Pay Now */}
        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500">Estimated Bill</p>
            <h3 className="text-2xl font-bold mt-2">₹ {bill}</h3>
          </div>

          <button
            onClick={() => setShowPayment(true)}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* ================= CHART ================= */}
      <div className="bg-white rounded-xl shadow p-6 h-[400px]">
        <h2 className="text-lg font-semibold mb-4">
          Day-wise Energy Consumption
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="units" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= PAYMENT MODAL ================= */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Pay Electricity Bill
            </h3>

            <p className="text-gray-600 mb-1">Amount Payable</p>
            <p className="text-2xl font-bold mb-6">₹ {bill}</p>

            <div className="space-y-3">
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => alert("UPI payment coming soon")}
              >
                Pay with UPI
              </button>

              <button
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                onClick={() => alert("Card payment coming soon")}
              >
                Pay with Card / Netbanking
              </button>
            </div>

            <button
              onClick={() => setShowPayment(false)}
              className="mt-6 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= CARD COMPONENT ================= */
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}
