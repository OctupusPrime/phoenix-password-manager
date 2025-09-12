import { StyleSheet } from 'react-native-unistyles';
import { getStoredColorTheme, convertToUnistylesTheme } from './utils';

const purpleLightTheme = {
  colors: {
    // Primary colors
    primary: 'rgb(101, 85, 143)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(233, 221, 255)',
    onPrimaryContainer: 'rgb(77, 61, 117)',
    inversePrimary: 'rgb(207, 189, 254)',
    primaryFixed: 'rgb(233, 221, 255)',
    onPrimaryFixed: 'rgb(32, 16, 71)',
    primaryFixedDim: 'rgb(207, 189, 254)',
    onPrimaryFixedVariant: 'rgb(77, 61, 117)',

    // Secondary colors
    secondary: 'rgb(98, 91, 113)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(232, 222, 248)',
    onSecondaryContainer: 'rgb(74, 68, 88)',
    secondaryFixed: 'rgb(232, 222, 248)',
    onSecondaryFixed: 'rgb(30, 25, 43)',
    secondaryFixedDim: 'rgb(203, 194, 219)',
    onSecondaryFixedVariant: 'rgb(74, 68, 88)',

    // Tertiary colors
    tertiary: 'rgb(126, 82, 96)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 217, 227)',
    onTertiaryContainer: 'rgb(99, 59, 72)',
    tertiaryFixed: 'rgb(255, 217, 227)',
    onTertiaryFixed: 'rgb(49, 16, 29)',
    tertiaryFixedDim: 'rgb(239, 184, 200)',
    onTertiaryFixedVariant: 'rgb(99, 59, 72)',

    // Error colors
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(147, 0, 10)',

    // Background & Surface
    background: 'rgb(253, 247, 255)',
    onBackground: 'rgb(29, 27, 32)',
    surface: 'rgb(253, 247, 255)',
    onSurface: 'rgb(29, 27, 32)',
    inverseSurface: 'rgb(50, 47, 53)',
    inverseOnSurface: 'rgb(245, 239, 247)',

    // Surface variants
    surfaceVariant: 'rgb(231, 224, 235)',
    onSurfaceVariant: 'rgb(73, 69, 78)',
    surfaceTint: 'rgb(101, 85, 143)',
    surfaceDim: 'rgb(222, 216, 224)',
    surfaceBright: 'rgb(253, 247, 255)',
    surfaceContainerLowest: 'rgb(255, 255, 255)',
    surfaceContainerLow: 'rgb(248, 242, 250)',
    surfaceContainer: 'rgb(242, 236, 244)',
    surfaceContainerHigh: 'rgb(236, 230, 238)',
    surfaceContainerHighest: 'rgb(230, 224, 233)',

    // Misc
    outline: 'rgb(122, 117, 127)',
    outlineVariant: 'rgb(202, 196, 207)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
  },
} as const;

const purpleDarkTheme = {
  colors: {
    // Primary colors
    primary: 'rgb(207, 189, 254)',
    onPrimary: 'rgb(54, 39, 93)',
    primaryContainer: 'rgb(77, 61, 117)',
    onPrimaryContainer: 'rgb(233, 221, 255)',
    inversePrimary: 'rgb(101, 85, 143)',
    primaryFixed: 'rgb(233, 221, 255)',
    onPrimaryFixed: 'rgb(32, 16, 71)',
    primaryFixedDim: 'rgb(207, 189, 254)',
    onPrimaryFixedVariant: 'rgb(77, 61, 117)',

    // Secondary colors
    secondary: 'rgb(203, 194, 219)',
    onSecondary: 'rgb(51, 45, 65)',
    secondaryContainer: 'rgb(74, 68, 88)',
    onSecondaryContainer: 'rgb(232, 222, 248)',
    secondaryFixed: 'rgb(232, 222, 248)',
    onSecondaryFixed: 'rgb(30, 25, 43)',
    secondaryFixedDim: 'rgb(203, 194, 219)',
    onSecondaryFixedVariant: 'rgb(74, 68, 88)',

    // Tertiary colors
    tertiary: 'rgb(239, 184, 200)',
    onTertiary: 'rgb(74, 37, 50)',
    tertiaryContainer: 'rgb(99, 59, 72)',
    onTertiaryContainer: 'rgb(255, 217, 227)',
    tertiaryFixed: 'rgb(255, 217, 227)',
    onTertiaryFixed: 'rgb(49, 16, 29)',
    tertiaryFixedDim: 'rgb(239, 184, 200)',
    onTertiaryFixedVariant: 'rgb(99, 59, 72)',

    // Error colors
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 218, 214)',

    // Background & Surface
    background: 'rgb(20, 18, 24)',
    onBackground: 'rgb(230, 224, 233)',
    surface: 'rgb(20, 18, 24)',
    onSurface: 'rgb(230, 224, 233)',
    inverseSurface: 'rgb(230, 224, 233)',
    inverseOnSurface: 'rgb(50, 47, 53)',

    // Surface variants
    surfaceVariant: 'rgb(73, 69, 78)',
    onSurfaceVariant: 'rgb(202, 196, 207)',
    surfaceTint: 'rgb(207, 189, 254)',
    surfaceDim: 'rgb(20, 18, 24)',
    surfaceBright: 'rgb(59, 56, 62)',
    surfaceContainerLowest: 'rgb(15, 13, 19)',
    surfaceContainerLow: 'rgb(29, 27, 32)',
    surfaceContainer: 'rgb(33, 31, 36)',
    surfaceContainerHigh: 'rgb(43, 41, 47)',
    surfaceContainerHighest: 'rgb(54, 52, 58)',

    // Misc
    outline: 'rgb(148, 143, 153)',
    outlineVariant: 'rgb(73, 69, 78)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
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
