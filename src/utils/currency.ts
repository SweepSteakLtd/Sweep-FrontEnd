export const penceToPounds = (pence?: number | null): number => {
  if (pence === undefined || pence === null) {
    return 0;
  }

  return pence / 100;
};

export const poundsToPence = (pounds: number | string): number => {
  // Handle string input
  if (typeof pounds === 'string') {
    const parsed = parseFloat(pounds);
    if (isNaN(parsed)) {
      return 0;
    }
    return parsed * 100;
  }

  // Handle number input
  if (typeof pounds !== 'number' || isNaN(pounds)) {
    return 0;
  }

  return pounds * 100;
};

export const formatCurrency = (pence?: number | null, hidePence = false): string => {
  const pounds = penceToPounds(pence);

  if (hidePence) {
    return `£${pounds.toLocaleString()}`;
  }

  return `£${pounds.toFixed(2)}`;
};
