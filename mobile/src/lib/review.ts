export const reviewIntervals = {
  tomorrow: 1,
  "three-days": 3,
  week: 7,
  "two-weeks": 14,
  month: 30,
} as const;
export function scheduleReview(
  from: Date,
  interval: keyof typeof reviewIntervals,
) {
  const date = new Date(from);
  date.setDate(date.getDate() + reviewIntervals[interval]);
  return date.toISOString();
}
