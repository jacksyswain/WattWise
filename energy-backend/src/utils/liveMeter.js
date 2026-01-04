export const incrementMeter = (value) => {
  const increment = Math.random() * 0.2 + 0.05; // 0.05–0.25
  return Number((value + increment).toFixed(1));
};
