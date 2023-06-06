import { createI18n } from "vue-i18n";
import store  from "./store";

export default createI18n({
  locale: `${store.getters.getLang}`,
  legacy: false,
  fallbackLocale: "en",
  messages: {
    en: require("@/locales/en.json"),
    ru: require("@/locales/ru.json"),
    kz: require("@/locales/kz.json")
  },
});