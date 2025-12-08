import { colorTokens } from './tokens';

// Semantic color mappings
export const theme = {
  colors: {
    primary: colorTokens.green800,
    secondary: colorTokens.gold500,
    accent: colorTokens.blue900,
    background: colorTokens.white,
    backgroundLight: colorTokens.gray100,
    backgroundDark: colorTokens.gray900,
    white: colorTokens.white,
    border: colorTokens.gray200,
    textSecondary: colorTokens.gray600,
    card: colorTokens.white,
    error: colorTokens.red500,
    warning: colorTokens.orange500,
    success: colorTokens.green500,
    text: {
      primary: colorTokens.gray900,
      secondary: colorTokens.gray600,
      tertiary: colorTokens.gray400,
      placeholder: colorTokens.gray400,
      muted: colorTokens.gray600,
    },
    button: {
      primary: colorTokens.gold500,
      secondary: colorTokens.transparent,
      text: colorTokens.green800,
    },
    input: {
      background: colorTokens.white,
      border: colorTokens.gray600,
      text: colorTokens.gray900,
    },
  },
} as const;

export type Theme = typeof theme;
