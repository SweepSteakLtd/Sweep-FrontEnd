/**
 * Convert pence to pounds (without formatting)
 * @param pence - Amount in pence (e.g., 9999)
 * @returns Amount in pounds (e.g., 99.99)
 */
export const penceToPounds = (pence?: number | null): number => {
  if (pence === undefined || pence === null) {
    return 0;
  }

  return pence / 100;
};

/**
 * Convert pounds to pence
 * @param pounds - Amount in pounds (e.g., 99.99) as number or string
 * @returns Amount in pence (e.g., 9999), or 0 if invalid
 */
export const poundsToPence = (pounds: number | string): number => {
  // Handle string input
  if (typeof pounds === 'string') {
    const parsed = parseFloat(pounds);
    if (isNaN(parsed)) {
      return 0;
    }
    return Math.round(parsed * 100);
  }

  // Handle number input
  if (typeof pounds !== 'number' || isNaN(pounds)) {
    return 0;
  }

  return Math.round(pounds * 100);
};

/**
 * Convert pence to pounds and format as currency
 * @param pence - Amount in pence (e.g., 9999)
 * @param hidePence - If true, removes decimal places (e.g., "£99" instead of "£99.99")
 * @returns Formatted currency string (e.g., "£99.99" or "£99")
 */
export const formatCurrency = (pence?: number | null, hidePence = false): string => {
  const pounds = penceToPounds(pence);

  if (hidePence) {
    return `£${Math.round(pounds).toLocaleString()}`;
  }

  return `£${pounds.toFixed(2)}`;
};
