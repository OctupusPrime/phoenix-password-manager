import { getLocales } from 'expo-localization';

import { storage } from '../mmkv';

export const getStoredAppLanguage = () => {
  const savedLanguage = storage.getString('app-language');

  return savedLanguage;
};

export const setStoreAppLanguage = (lang: string) => {
  storage.set('app-language', lang);
};

export const getBestDeviceLocale = (availableLocales: string[]) => {
  const userLocales = getLocales();
  const normalizedUserLocales = userLocales.map((locale) =>
    locale.languageTag.split('-')[0].toLowerCase(),
  );

  return normalizedUserLocales.find((userLocale) =>
    availableLocales.includes(userLocale),
  );
};
