<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { ref, watch } from "vue";

const props = defineProps<{
  price: string;
}>();

const { currencyLable } = useAppStore();
const isNewValueBigger = ref(true);

watch(
  () => props.price,
  (curr, prev) => {
    isNewValueBigger.value = Number(curr) >= Number(prev);
  }
);
</script>

<template>
  <div
    class="price"
    :class="{ price_negative: !isNewValueBigger }"
    :key="price"
  >
    {{ currencyLable }}{{ price }}
  </div>
</template>

<style scoped>
.price {
  animation-name: positive;
  animation-duration: 2s;
}
.price_negative {
  animation-name: negative;
}
@keyframes negative {
  0% {
    color: var(--text-color);
  }
  50% {
    color: var(--color-negative);
  }
  100% {
    color: var(--text-color);
  }
}
@keyframes positive {
  0% {
    color: var(--text-color);
  }
  50% {
    color: var(--color-positive);
  }
  100% {
    color: var(--text-color);
  }
}
</style>
