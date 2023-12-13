import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import en from './locales/en.json';
import ro from './locales/ro.json';

export const resources = {
  en: {
    translation: en,
  },
  ro: {
    translation: ro,
  },
} as const;

i18next.use(initReactI18next).init({
  lng: 'en',
  resources,
  debug: false,
  fallbackLng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

i18next.on('languageChanged', (lng) => {
  // Update the html lang tag
  document.documentElement.setAttribute('lang', lng);
});

export default i18next;
