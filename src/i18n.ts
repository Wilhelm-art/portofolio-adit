import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import idCommon from './locales/id/common.json';

const isEn = typeof window !== 'undefined' && window.location.pathname.startsWith('/en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      id: {
        common: idCommon,
      },
    },
    lng: isEn ? 'en' : 'id',
    fallbackLng: 'id',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
