import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './messages/en.json';
import uk from './messages/uk.json';

import {
  getStoredAppLanguage,
  setStoreAppLanguage,
  getBestDeviceLocale,
} from './utils';
import { dayjs } from '../dayjs';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
} as const;

const availableLocales = Object.keys(resources);

const getInitialLanguage = () => {
  const savedAppLanguage = getStoredAppLanguage();
  const lang = savedAppLanguage ?? getBestDeviceLocale(availableLocales);

  if (lang) dayjs.locale(lang);

  return lang;
};

i18n.use(initReactI18next).init({
  lng: getInitialLanguage(),
  fallbackLng: availableLocales[0],

  resources,

  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lang) => {
  setStoreAppLanguage(lang);
  dayjs.locale(lang);
});

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
