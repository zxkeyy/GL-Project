import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(lng);
      document.documentElement.dir = i18n.t("direction") as string;
      document.documentElement.lang = lng;
    } else {
      console.error("i18n is not properly initialized");
    }
  };

  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("fr")}>French</button>
      <button onClick={() => changeLanguage("ar")}>Arabic</button>
    </div>
  );
};

export default LanguageSwitcher;
