// Helper to format score display
export const formatScore = (score: number | null): string => {
  if (score === null) return 'MC';
  if (score === 0) return 'E';
  return score > 0 ? `+${score}` : `${score}`;
};

// Helper to get score color
export const getScoreColor = (
  score: number | null,
  theme?: { colors: { primary: string; error: string; text: { secondary: string } } },
): string => {
  if (score === null) return theme?.colors.text.secondary || '#666666';
  if (score < 0) return '#FF0000'; // Red for negative
  if (score === 0) return '#87CEEB'; // Light blue for zero
  return '#00FF00'; // Green for positive
};
