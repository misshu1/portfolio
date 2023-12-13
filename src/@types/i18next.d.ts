// import { resources } from '../i18n';
import en from '../locales/en.json';
import ro from '../locales/ro.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      ro: typeof ro;
    };
  }
}
