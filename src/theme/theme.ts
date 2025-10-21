import { colorTokens } from './tokens';

// Semantic color mappings
export const theme = {
  colors: {
    primary: colorTokens.green800,
    secondary: colorTokens.gold500,
    background: colorTokens.green100,
    white: colorTokens.white,
    border: colorTokens.green800,
    textSecondary: colorTokens.gray600,
    card: colorTokens.white,
    text: {
      primary: colorTokens.white,
      secondary: colorTokens.green800,
      muted: colorTokens.gray600,
    },
    button: {
      primary: colorTokens.gold500,
      secondary: colorTokens.transparent,
      text: colorTokens.green800,
    },
    input: {
      background: colorTokens.green900,
      border: colorTokens.green800,
      text: colorTokens.white,
    },
  },
} as const;

export type Theme = typeof theme;
