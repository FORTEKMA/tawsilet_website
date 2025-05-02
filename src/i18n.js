import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || "fr-FR", // Default to the saved language or fallback
    fallbackLng: "fr-FR", // Set the fallback language
    detection: {
      order: ["localStorage", "navigator"], // Use localStorage first, then navigator
      caches: ["localStorage"], // Save detected language in localStorage
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
