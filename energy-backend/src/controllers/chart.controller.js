import DayWiseUsage from "../models/DayWiseUsage.js";

export const getMonthlyDayWiseUsage = async (req, res) => {
  const { deviceId } = req.query;

  const now = new Date();
  const year = now.getFullYear();
  const monthIndex = now.getMonth(); // 0-based
  const today = now.getDate();

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const monthKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

  // Fetch all stored day-wise usage for this month
  const records = await DayWiseUsage.find({
    deviceId,
    date: { $regex: `^${monthKey}` }
  });

  const usageMap = {};
  records.forEach(r => {
    usageMap[r.day] = r.units;
  });

  const chartData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    chartData.push({
      day,
      units: day <= today ? usageMap[day] || 0 : 0
    });
  }

  res.json({
    month: monthKey,
    totalDays: daysInMonth,
    data: chartData
  });
};
