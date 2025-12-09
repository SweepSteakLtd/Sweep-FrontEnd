/**
 * Convert a 2-letter country code to a flag emoji
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., "US", "GB")
 * @returns Flag emoji or default flag if code is invalid
 */
export const getCountryFlag = (countryCode?: string): string => {
  if (!countryCode) return '🏳️';

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
