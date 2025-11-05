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
 * @param pounds - Amount in pounds (e.g., 99.99)
 * @returns Amount in pence (e.g., 9999)
 */
export const poundsToPence = (pounds: number): number => {
  return Math.round(pounds * 100);
};

/**
 * Convert pence to pounds and format as currency
 * @param pence - Amount in pence (e.g., 9999)
 * @returns Formatted currency string (e.g., "£99.99")
 */
export const formatCurrency = (pence?: number | null): string => {
  const pounds = penceToPounds(pence);
  return `£${pounds.toFixed(2)}`;
};
