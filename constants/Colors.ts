/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // Basic colors
    text: '#1f2937',
    background: '#e4e4e7',
    tint: tintColorLight,
    icon: '#6b7280',
    tabIconDefault: '#9ca3af',
    tabIconSelected: tintColorLight,
    
    // Basketball app specific colors
    primary: '#3b82f6',
    secondary: '#ef4444',
    accent: '#22c55e',
    surface: '#ffffff',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    border: '#e5e7eb',
    shadow: '#000000',
    buttonText: '#ffffff',
    searchBackground: '#ffffff',
    cardBorder: '#e5e7eb',
    tabBarBackground: '#ffffff',
    headerBackground: '#3b82f6',
    headerText: '#ffffff',
    
    // Chart colors
    chartRed: '#ef4444',
    chartGreen: '#22c55e',
    chartBlue: '#3b82f6',
    chartAxis: '#9ca3af',
    chartText: '#6b7280',
    
    // Status colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  dark: {
    // Basic colors
    text: '#f9fafb',
    background: '#111827',
    tint: tintColorDark,
    icon: '#9ca3af',
    tabIconDefault: '#6b7280',
    tabIconSelected: tintColorDark,
    
    // Basketball app specific colors
    primary: '#60a5fa',
    secondary: '#f87171',
    accent: '#4ade80',
    surface: '#1f2937',
    textSecondary: '#d1d5db',
    textMuted: '#9ca3af',
    border: '#374151',
    shadow: '#000000',
    buttonText: '#1f2937',
    searchBackground: '#374151',
    cardBorder: '#4b5563',
    tabBarBackground: '#1f2937',
    headerBackground: '#1f2937',
    headerText: '#f9fafb',
    
    // Chart colors
    chartRed: '#f87171',
    chartGreen: '#4ade80',
    chartBlue: '#60a5fa',
    chartAxis: '#6b7280',
    chartText: '#9ca3af',
    
    // Status colors
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
};
