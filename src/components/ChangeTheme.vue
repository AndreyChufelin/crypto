<script setup lang="ts">
import IconMoon from "./icons/IconMoon.vue";
import IconSun from "./icons/IconSun.vue";
import { useAppStore, Theme } from "../stores/app";
import { computed } from "vue";

const store = useAppStore();

const theme = computed({
  get() {
    return store.theme;
  },
  set(value) {
    store.changeTheme(value);
  },
});
</script>

<template>
  <button
    class="them-toggle"
    @click="theme = theme === Theme.dark ? Theme.light : Theme.dark"
  >
    <IconMoon v-if="store.theme === Theme.dark" class="them-toggle__icon" />
    <IconSun v-else class="them-toggle__icon" />
  </button>
</template>

<style scoped>
.them-toggle__icon:hover {
  transition: fill 0.25s;
  fill: var(--color-additional);
}
</style>
