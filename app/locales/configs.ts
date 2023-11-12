import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enDefault from "@locales/en.json";
import jaDefault from "@locales/ja.json";
import enCommon from "@locales/en/common.json";
import jaCommon from "@locales/ja/common.json";
import jaDashboard from "@locales/ja/features/dashboard.json";

const resources = {
  ja: {
    translation: jaDefault,
    common: jaCommon,
    dashboard: jaDashboard,
  },
  en: {
    translation: enDefault,
    common: enCommon,
  }
};
const initOptions = {
  resources,
  lng: 'ja',
  returnNull: false,
  interpolation: {
    escapeValue: false
  }
};

i18n.use(initReactI18next)
  .init(initOptions);
