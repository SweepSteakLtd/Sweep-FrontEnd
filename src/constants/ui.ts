/**
 * UI Constants
 * Centralized constants for consistent UI/UX across the application
 */

/**
 * Icon sizes used throughout the application
 */
export const ICON_SIZES = {
  /** Small icons used in headers and compact displays */
  HEADER: 16,
  /** Default icon size */
  DEFAULT: 24,
} as const;

/**
 * Currency formatting options
 */
export const CURRENCY_FORMAT = {
  /** Hide pence/cents, show whole pounds/dollars only */
  HIDE_PENCE: true,
  /** Show pence/cents with decimal places */
  SHOW_PENCE: false,
} as const;

/**
 * Header minimum heights for consistent layout
 */
export const HEADER_MIN_HEIGHT = {
  /** Standard header height for tournament and league screens */
  STANDARD: 300,
  /** Compact header height */
  COMPACT: 250,
} as const;
