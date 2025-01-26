import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "./locales/en.json";
import translationFr from "./locales/fr.json";
import translationAr from "./locales/ar.json";
import useLanguageStore from "@/store/languageStore";

const resources = {
  en: { translation: translationEn },
  fr: { translation: translationFr },
  ar: { translation: translationAr },
};

const initI18n = async () => {
  const { language, setLanguage } = useLanguageStore.getState();

  if (!language) {
    setLanguage(Localization.getLocales()[0].languageCode);
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    resources,
    lng: language || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
