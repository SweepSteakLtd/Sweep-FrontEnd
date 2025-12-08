// Helper to format score display
export const formatScore = (score: number | null): string => {
  if (score === null) return 'MC';
  if (score === 0) return 'E';
  return score > 0 ? `+${score}` : `${score}`;
};

// Helper to get score color
export const getScoreColor = (
  score: number | null,
  theme: { colors: { primary: string; error: string; text: { secondary: string } } },
): string => {
  if (score === null) return theme.colors.text.secondary;
  if (score < 0) return theme.colors.primary;
  if (score > 0) return theme.colors.error;
  return theme.colors.text.secondary;
};
