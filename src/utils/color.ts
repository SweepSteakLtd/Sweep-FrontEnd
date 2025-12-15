// Map of common CSS named colors to hex values
const namedColors: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
  yellow: '#ffff00',
  cyan: '#00ffff',
  magenta: '#ff00ff',
  orange: '#ffa500',
  purple: '#800080',
  pink: '#ffc0cb',
  brown: '#a52a2a',
  gray: '#808080',
  grey: '#808080',
  gold: '#ffd700',
  silver: '#c0c0c0',
  navy: '#000080',
  teal: '#008080',
  maroon: '#800000',
  olive: '#808000',
  lime: '#00ff00',
  aqua: '#00ffff',
  coral: '#ff7f50',
  salmon: '#fa8072',
  tomato: '#ff6347',
  violet: '#ee82ee',
  indigo: '#4b0082',
  turquoise: '#40e0d0',
  tan: '#d2b48c',
  khaki: '#f0e68c',
  crimson: '#dc143c',
  chocolate: '#d2691e',
  transparent: 'transparent',
};

/**
 * Converts a color to rgba with the specified opacity
 * @param color - Hex color string (e.g., '#1a5f2a', '1a5f2a', '#fff') or named color (e.g., 'red', 'blue')
 * @param opacity - Opacity value between 0 and 1
 * @returns rgba color string
 */
export const hexWithOpacity = (color: string, opacity: number): string => {
  if (!color) return 'transparent';

  // If already rgba/rgb, try to add opacity
  if (color.startsWith('rgb')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }

  // Check if it's a named color
  const lowerColor = color.toLowerCase();
  if (namedColors[lowerColor]) {
    if (lowerColor === 'transparent') return 'transparent';
    color = namedColors[lowerColor];
  }

  let cleanHex = color.replace('#', '');

  // Handle 3-digit hex (e.g., #fff -> #ffffff)
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Validate hex length
  if (cleanHex.length !== 6) {
    return color; // Return original if invalid
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Check for NaN values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return color; // Return original if parsing failed
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
