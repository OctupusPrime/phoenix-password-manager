import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

import { createSafeContext } from '@/utils/create-safe-context';
import {
  convertToUnistylesTheme,
  getStoredColorTheme,
  setStoreColorTheme,
} from './utils';

export interface ColorThemeContextValue {
  colorTheme: {
    preferredAppearance: string;
    mainColor: string;
  };
  setColorTheme: (newTheme: {
    mainColor: string;
    preferredAppearance: string;
  }) => void;
}

const [Provider, useColorThemeContext] =
  createSafeContext<ColorThemeContextValue>(
    'ColorThemeContextValue component was not found in the tree',
  );

interface ColorThemeProviderProps {
  children: React.ReactNode;
}

const ColorThemeProvider = ({ children }: ColorThemeProviderProps) => {
  const [colorTheme, setColorTheme] = useState(getStoredColorTheme());

  const handleSetColorTheme = (newTheme: {
    mainColor: string;
    preferredAppearance: string;
  }) => {
    setColorTheme(newTheme);
    setStoreColorTheme(newTheme);

    UnistylesRuntime.setTheme(convertToUnistylesTheme(newTheme));
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      if (colorTheme.preferredAppearance !== 'system') return;

      UnistylesRuntime.setTheme(convertToUnistylesTheme(colorTheme));
    });

    return () => subscription.remove();
  }, [colorTheme]);

  return (
    <Provider value={{ colorTheme, setColorTheme: handleSetColorTheme }}>
      {children}
    </Provider>
  );
};

export { ColorThemeProvider, useColorThemeContext };
