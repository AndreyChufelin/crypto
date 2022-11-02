<script setup lang="ts">
import ChangeLanguageButton from "./ChangeLanguageButton.vue";
import SearchCoins from "./SearchCoins.vue";
import ChangeTheme from "./ChangeTheme.vue";
import SelectCurrency from "./SelectCurrency.vue";
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <RouterLink :to="{ name: 'home' }" class="header__logo">
        Crypto
      </RouterLink>
      <ul>
        <li>
          <RouterLink :to="{ name: 'home' }" class="header__nav-item link">
            {{ $t("header.coins") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'exchanges' }" class="header__nav-item link">
            {{ $t("header.exchanges") }}
          </RouterLink>
        </li>
      </ul>
    </nav>
    <SearchCoins />
    <ul class="header__settings">
      <li>
        <SelectCurrency />
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
