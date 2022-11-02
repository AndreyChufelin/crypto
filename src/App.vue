<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import { useAppStore } from "./stores/app";
import { i18n, Languages } from "./utils/localization";
import TheFooter from "./components/TheFooter.vue";
import { watch } from "vue";
import { currentRate } from "./services/rates";

const appStore = useAppStore();

if (!appStore.language) {
  const browserLanguage = navigator.language.split("-")[0];
  appStore.changeLanguage(
    Object.values(Languages).includes(browserLanguage)
      ? (browserLanguage as Languages)
      : Languages.en
  );
} else {
  i18n.global.locale.value = appStore.language;
}

watch(
  () => appStore.rate.rateUsd,
  (value) => {
    currentRate.value = +value;
  }
);
</script>

<template>
  <div class="app" :class="[appStore.theme]">
    <div class="app__container container">
      <TheHeader />
      <main class="app__content">
        <RouterView />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<style scoped>
.app {
  background-color: var(--color-background);
  font-family: "Inter", sans-serif;
  color: var(--color-text);
}
.app__container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app__content {
  flex: 1 auto;
}

.container {
  box-sizing: content-box;
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 2%;
}
</style>
