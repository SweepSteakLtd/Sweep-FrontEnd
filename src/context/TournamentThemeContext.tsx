import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useTheme } from 'styled-components/native';

export type TournamentColors = {
  primary?: string;
  secondary?: string;
  highlight?: string;
};

type TournamentTheme = {
  primary: string;
  secondary: string;
  highlight: string;
};

type TournamentThemeContextValue = {
  tournamentTheme: TournamentTheme;
  setColors: (colors: TournamentColors | undefined) => void;
};

const TournamentThemeContext = createContext<TournamentThemeContextValue | undefined>(undefined);

interface TournamentThemeProviderProps {
  children: React.ReactNode;
  initialColors?: TournamentColors;
}

export const TournamentThemeProvider = ({
  children,
  initialColors,
}: TournamentThemeProviderProps) => {
  const appTheme = useTheme();
  const [colors, setColorsState] = useState<TournamentColors | undefined>(initialColors);

  const tournamentTheme = useMemo(
    () => ({
      primary: colors?.primary || appTheme.colors.primary,
      secondary: colors?.secondary || appTheme.colors.secondary,
      highlight: colors?.highlight || appTheme.colors.primary,
    }),
    [colors, appTheme.colors.primary, appTheme.colors.secondary],
  );

  const setColors = useCallback((newColors: TournamentColors | undefined) => {
    setColorsState(newColors);
  }, []);

  const value = useMemo(
    () => ({
      tournamentTheme,
      setColors,
    }),
    [tournamentTheme, setColors],
  );

  return (
    <TournamentThemeContext.Provider value={value}>{children}</TournamentThemeContext.Provider>
  );
};

export const useTournamentTheme = () => {
  const context = useContext(TournamentThemeContext);

  // Return fallback values if used outside provider (e.g., on Dashboard)
  const appTheme = useTheme();

  if (!context) {
    return {
      tournamentTheme: {
        primary: appTheme.colors.primary,
        secondary: appTheme.colors.secondary,
        highlight: appTheme.colors.primary,
      },
      setColors: () => {},
    };
  }

  return context;
};
