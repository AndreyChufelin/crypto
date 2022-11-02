<script setup lang="ts">
import type { Rate } from "@/services/rates";
import { useAppStore } from "@/stores/app";
import { computed } from "vue";

const props = defineProps<{
  rate: Rate;
}>();

const emit = defineEmits<{
  (e: "choosed"): void;
}>();

const store = useAppStore();

const name = computed(() => {
  const nameByWords = props.rate.id.split("-");
  const capitalized = nameByWords.map((word) => {
    return word[0].toUpperCase() + word.slice(1, word.length);
  });
  return capitalized.join(" ");
});

function choose() {
  store.changeRate(props.rate);
  emit("choosed");
}
</script>

<template>
  <li class="popup-item__wrapper">
    <button class="popup-item" @click="choose">
      <span>{{ name }}</span>
      <span class="popup-item__subtitle">
        {{ rate.symbol }}
        <template v-if="rate.currencySymbol">
          , {{ rate.currencySymbol }}
        </template>
      </span>
    </button>
  </li>
</template>

<style scoped>
.popup-item__wrapper {
  height: fit-content;
  width: 50%;
}
.popup-item {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  text-align: left;
  display: flex;
  flex-direction: column;
  column-gap: 5px;
  transition: background 0.25s;
}
.popup-item:hover,
.popup-item:focus {
  background-color: var(--color-background-soft-2);
  outline: none;
}
.popup-item__subtitle {
  font-size: 0.8em;
  color: var(--color-text-soft);
}
</style>
