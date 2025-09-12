import { StyleSheet } from 'react-native-unistyles';
import { getStoredColorTheme, convertToUnistylesTheme } from './utils';

const purpleLightTheme = {
  colors: {
    primary: '#ff1ff4',
  },
} as const;

const purpleDarkTheme = {
  colors: {
    primary: 'red',
  },
} as const;

const appThemes = {
  'purple-light': purpleLightTheme,
  'purple-dark': purpleDarkTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: convertToUnistylesTheme(getStoredColorTheme()),
  },
  themes: appThemes,
  breakpoints,
});
