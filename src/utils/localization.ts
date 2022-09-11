import { createI18n } from "vue-i18n";

export enum Languages {
  ru = "ru",
  en = "en",
}

const messages = {
  en: {
    message: {
      coins: "Coins",
      exchanges: "Exchanges",
    },
  },
  ru: {
    message: {
      coins: "Токены",
      exchanges: "Транзакции",
    },
  },
};

export const i18n = createI18n({
  locale: Languages.en,
  fallbackLocale: Languages.en,
  legacy: false,
  messages,
});
