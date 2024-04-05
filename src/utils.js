export const bound = (value, start, end) => {
  if (value < start) return start;
  if (value > end) return end;
  return value;
};
