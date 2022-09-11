import { i18n, Languages } from "@/utils/localization";
import { defineStore } from "pinia";

export enum Theme {
  dark = "dark",
  light = "light",
}

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    currency: localStorage.getItem("currency") ?? "$",
    language: (localStorage.getItem("language") as Languages) ?? null,
    theme: (localStorage.getItem("theme") as Theme) ?? Theme.dark,
  }),
  getters: {},
  actions: {
    changeLanguage(payload: Languages) {
      i18n.global.locale.value = payload;
      this.language = payload;
      localStorage.setItem("language", payload);
    },
    changeCurrency(payload: string) {
      this.currency = payload;
      localStorage.setItem("currency", payload);
    },
    changeTheme(payload: Theme) {
      this.theme = payload;
      localStorage.setItem("theme", payload);
    },
  },
});
