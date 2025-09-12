import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './messages/en.json';
import uk from './messages/uk.json';

import { storage } from '../mmkv';
import { setDayjsLocale } from '../dayjs';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
} as const;

const isLanguageSupported = (lang: string) => {
  const normalizedLang = lang.split('-')[0];
  return Object.keys(resources).includes(normalizedLang);
};

const getUserLanguage = () => {
  const savedLanguage = storage.getString('language');

  if (savedLanguage) {
    setDayjsLocale(savedLanguage);
    return savedLanguage;
  }

  const userLocales = getLocales();
  const primaryUserLanguage = userLocales[0].languageTag;

  if (isLanguageSupported(primaryUserLanguage)) {
    setDayjsLocale(primaryUserLanguage);
    return primaryUserLanguage;
  }

  setDayjsLocale('en');
  return 'en';
};

i18n.use(initReactI18next).init({
  lng: getUserLanguage(),
  fallbackLng: 'en',

  resources,

  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  storage.set('language', lng);
  setDayjsLocale(lng);
});

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
