<script setup lang="ts">
import VueSelect from "./VueSelect.vue";
import IconRussiaFlag from "./icons/IconRussiaFlag.vue";
import IconUKFlag from "./icons/IconUKFlag.vue";
import { computed } from "vue";
import { useAppStore } from "@/stores/app";
import type { Languages } from "@/utils/localization";

const store = useAppStore();

const langauge = computed({
  get() {
    return store.language;
  },
  set(value: Languages) {
    store.changeLanguage(value);
  },
});
</script>

<template>
  <VueSelect v-model="langauge" :options="['ru', 'en']">
    <template #input="{ value }">
      <IconRussiaFlag v-if="value === 'ru'" />
      <IconUKFlag v-else-if="value === 'en'" />
    </template>
    <template #option="{ message }">
      <IconRussiaFlag v-if="message === 'ru'" />
      <IconUKFlag v-else-if="message === 'en'" />
    </template>
  </VueSelect>
</template>

<style scoped></style>
