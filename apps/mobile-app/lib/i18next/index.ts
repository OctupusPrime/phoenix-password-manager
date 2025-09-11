import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './messages/en.json';
import uk from './messages/uk.json';

import { storage } from '../mmkv';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
} as const;

const getUserLanguage = () => {
  const savedLanguage = storage.getString('language');

  if (savedLanguage) return savedLanguage;

  const userLocales = getLocales();
  const primaryUserLanguage = userLocales[0].languageTag;

  return primaryUserLanguage;
};

i18n.use(initReactI18next).init({
  lng: getUserLanguage(),
  fallbackLng: 'en',

  resources,

  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  storage.set('language', lng);
});

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
