<script setup lang="ts">
import { computed } from "vue";
import VueSelect from "./VueSelect.vue";
import ChangeLanguageButton from "./ChangeLanguageButton.vue";
import { useAppStore } from "@/stores/app";
import SearchCoins from "./SearchCoins.vue";
import ChangeTheme from "./ChangeTheme.vue";

const store = useAppStore();

const currency = computed({
  get() {
    return store.currency;
  },
  set(value) {
    store.changeCurrency(value);
  },
});
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <a href="/" class="header__logo">Crypto</a>
      <ul>
        <li>
          <a href="" class="header__nav-item link">{{ $t("message.coins") }}</a>
        </li>
        <li>
          <a href="" class="header__nav-item link">Exchanges</a>
        </li>
      </ul>
    </nav>
    <SearchCoins />
    <ul class="header__settings">
      <li>
        <VueSelect
          v-model="currency"
          :options="[
            { lable: '$', value: 'dollar' },
            { lable: '€', value: 'euro' },
            { lable: '₽', value: 'rubble' },
          ]"
        />
      </li>
      <li>
        <ChangeLanguageButton />
      </li>
      <li>
        <ChangeTheme />
      </li>
    </ul>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
}
.header__nav {
  display: flex;
  align-items: center;
  column-gap: 1.563em;
}
.header__nav ul {
  display: flex;
  column-gap: 0.625em;
}
.header__logo {
  font-size: 1.5rem;
  font-weight: 800;
  transition: color 0.25s;
}
.header__logo:hover,
.header__logo:focus {
  color: var(--color-additional);
  outline: none;
}
.header__settings {
  display: flex;
  align-items: center;
  column-gap: 1.785em;
}
</style>
