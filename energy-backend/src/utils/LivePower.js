export const calculateLivePower = (currentValue, lastUpdatedAt) => {
  const now = new Date();
  const diffMs = now - new Date(lastUpdatedAt);

  const minutesPassed = Math.floor(diffMs / 60000); // 1 min = 60000 ms

  if (minutesPassed <= 0) {
    return {
      newValue: currentValue,
      updated: false,
    };
  }

  const increment = minutesPassed * 0.2;

  return {
    newValue: Number((currentValue + increment).toFixed(1)),
    updated: true,
  };
};
