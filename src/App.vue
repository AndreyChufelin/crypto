<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "./components/TheHeader.vue";
import { useAppStore } from "./stores/app";
import { Languages } from "./utils/localization";

const appStore = useAppStore();
if (!appStore.language) {
  const browserLanguage = navigator.language.split("-")[0];
  appStore.changeLanguage(
    Object.values(Languages).includes(browserLanguage)
      ? (browserLanguage as Languages)
      : Languages.en
  );
}
</script>

<template>
  <div class="app" :class="[appStore.theme]">
    <div class="container">
      <TheHeader />
      <main class="app__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
  background-color: var(--color-background);
  font-family: "Inter", sans-serif;
  color: var(--color-text);
}

.container {
  box-sizing: content-box;
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 2%;
}
</style>
