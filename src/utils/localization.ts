import { createI18n } from "vue-i18n";

export enum Languages {
  ru = "ru",
  en = "en",
}

const messages = {
  en: {
    header: {
      coins: "Coins",
      exchanges: "Exchanges",
      find_coins: "Find coins...",
    },
    assetTable: {
      rank: "Rank",
      name: "Name",
      price: "Price",
      marketCap: "Market Cap",
      vwap: "VWAP (24Hr)",
      supply: "Supply",
      volume: "Volume(24Hr)",
      change: "Change(24Hr)",
    },
    exchangeTable: {
      pair: "Pair",
      total: "Total",
      status: "Status",
    },
  },
  ru: {
    header: {
      coins: "Токены",
      exchanges: "Транзакции",
      find_coins: "Искать токены...",
    },
    assetTable: {
      rank: "Рейтинг",
      name: "Имя",
      price: "Стоимость",
      marketCap: "Рыночная капитализация",
      vwap: "VWAP (24ч)",
      supply: "Доступные ресурсы",
      volume: "Volume(24ч)",
      change: "Изменение(24ч)",
    },
    exchangeTable: {
      pair: "Пара",
      total: "Total",
      status: "Статус",
    },
  },
};

export const i18n = createI18n({
  locale: Languages.en,
  fallbackLocale: Languages.en,
  legacy: false,
  messages,
});
