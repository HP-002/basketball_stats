/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import React, { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { Appearance } from 'react-native';

type ThemeColors = typeof Colors.light;

type ThemeContextValue = {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemDark = Appearance.getColorScheme() === 'dark';
  const [isDark, setIsDark] = useState<boolean>(systemDark);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: isDark ? Colors.dark : Colors.light,
      isDark,
      toggleTheme: () => setIsDark((p) => !p),
      setTheme: setIsDark,
    }),
    [isDark]
  );

  return <ThemeContext.Provider value={value}> { children } </ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
}