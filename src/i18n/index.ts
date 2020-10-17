import i18n from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import ja from './ja';

const resources = {ja};

i18n.use(i18nextBrowserLanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'ja-JP',
  debug: false,
});

export default i18n;