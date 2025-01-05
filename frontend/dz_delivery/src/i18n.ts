import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationFR from "./locales/fr.json";
import tranlsationAR from "./locales/ar.json";

export const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
  ar: { translation: tranlsationAR },
} as const;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    fr: { translation: translationFR },
    ar: { translation: tranlsationAR },
  },
  lng: "en", // default language
  fallbackLng: "en", // fallback language
  debug: true,
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
