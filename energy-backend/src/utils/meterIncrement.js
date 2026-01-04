export const updateMeterByTime = (meter) => {
  const now = new Date();
  const diffMs = now - new Date(meter.lastUpdatedAt);

  const minutesPassed = Math.floor(diffMs / 60000);

  if (minutesPassed <= 0) return meter;

  meter.meterReading = Number(
    (meter.meterReading + minutesPassed * 0.2).toFixed(1)
  );

  meter.lastUpdatedAt = now;
  return meter;
};
