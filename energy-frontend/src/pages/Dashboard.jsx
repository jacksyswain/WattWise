import { useEffect, useState } from "react";
import {
  fetchLivePower,
  fetchTodayUsage,
  fetchMonthlyBill,
  fetchMonthlyChart,
  logoutUser,
} from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  BoltIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const DEVICE_ID = "METER001";

export default function Dashboard() {
  const [livePower, setLivePower] = useState(0);
  const [todayUsage, setTodayUsage] = useState(0);
  const [monthUsage, setMonthUsage] = useState(0);
  const [bill, setBill] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  /* 🔴 Live power polling */
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetchLivePower(DEVICE_ID);
        setLivePower(res.data.livePower ?? 0);
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  /* 🔵 Load stats */
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
        console.error(err);
      }
    }

    loadData();
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            ⚡ WattWise
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="Live Power"
            value={`${livePower} kWh`}
            icon={<BoltIcon />}
            gradient="from-sky-500 to-blue-600"
          />

          <StatCard
            title="Today Usage"
            value={`${todayUsage} units`}
            icon={<CalendarIcon />}
            gradient="from-emerald-500 to-green-600"
          />

          <StatCard
            title="This Month"
            value={`${monthUsage} units`}
            icon={<ChartBarIcon />}
            gradient="from-indigo-500 to-purple-600"
          />

          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-500">Estimated Bill</p>
              <h3 className="text-3xl font-bold mt-2 text-gray-800">
                ₹ {bill}
              </h3>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-medium transition"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* ================= CHART ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-[420px]">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Day-wise Energy Consumption
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>

      {/* ================= PAYMENT MODAL ================= */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md animate-scaleIn">
            <h3 className="text-xl font-semibold mb-2">
              Pay Electricity Bill
            </h3>

            <p className="text-gray-500 mb-4">
              Secure & instant payment
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">Amount Payable</p>
              <p className="text-3xl font-bold text-gray-800">
                ₹ {bill}
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700">
                Pay with UPI
              </button>
              <button className="w-full bg-purple-600 text-white py-2.5 rounded-xl hover:bg-purple-700">
                Pay with Card / Netbanking
              </button>
            </div>

            <button
              onClick={() => setShowPayment(false)}
              className="mt-5 w-full border py-2 rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value, icon, gradient }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-lg text-white bg-gradient-to-br ${gradient}`}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm opacity-90">{title}</p>
        <div className="w-8 h-8 opacity-90">{icon}</div>
      </div>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}
