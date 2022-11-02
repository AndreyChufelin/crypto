import { usdRate, type Rate } from "@/services/rates";
import { i18n, Languages } from "@/utils/localization";
import { defineStore } from "pinia";

export enum Theme {
  dark = "dark",
  light = "light",
}
interface appState {
  rate: Rate;
  language: Languages;
  theme: Theme;
}

export const useAppStore = defineStore({
  id: "app",
  state: (): appState => ({
    rate: localStorage.getItem("rate")
      ? (JSON.parse(localStorage.getItem("rate") as string) as Rate)
      : usdRate,
    language: (localStorage.getItem("language") as Languages) ?? null,
    theme: (localStorage.getItem("theme") as Theme) ?? Theme.dark,
  }),
  getters: {
    currencyLable(): string {
      return this.rate.currencySymbol ?? this.rate.symbol;
    },
  },
  actions: {
    changeLanguage(payload: Languages) {
      i18n.global.locale.value = payload;
      this.language = payload;
      localStorage.setItem("language", payload);
    },
    changeRate(payload: Rate) {
      this.rate = payload;
      localStorage.setItem("rate", JSON.stringify(payload));
    },
    changeTheme(payload: Theme) {
      this.theme = payload;
      localStorage.setItem("theme", payload);
    },
  },
});
