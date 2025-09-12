import { Appearance } from 'react-native';
import { UnistylesThemes } from 'react-native-unistyles';

import { storage } from '../mmkv';

export const getStoredColorTheme = () => {
  const savedPreferredAppearance =
    storage.getString('preferred-theme-appearance') ?? 'system';
  const savedMainColor = storage.getString('main-theme-color') ?? 'purple';

  return {
    preferredAppearance: savedPreferredAppearance,
    mainColor: savedMainColor,
  };
};

export const setStoreColorTheme = (theme: {
  preferredAppearance: string;
  mainColor: string;
}) => {
  storage.set('preferred-theme-appearance', theme.preferredAppearance);
  storage.set('main-theme-color', theme.mainColor);
};

export const convertToUnistylesTheme = (theme: {
  preferredAppearance: string;
  mainColor: string;
}) => {
  if (theme.preferredAppearance === 'system') {
    const deviceAppearance = Appearance.getColorScheme() ?? 'light';

    return `${theme.mainColor}-${deviceAppearance}` as keyof UnistylesThemes;
  }

  return `${theme.mainColor}-${theme.preferredAppearance}` as keyof UnistylesThemes;
};
