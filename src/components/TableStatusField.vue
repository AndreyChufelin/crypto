<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  status: number;
}>();

const howLongAgo = computed(() => {
  return (Date.now() - props.status) / 1000;
});
</script>

<template>
  <div
    class="indicator"
    :class="{
      indicator_medium: howLongAgo > 600,
      indicator_long: howLongAgo > 86400,
    }"
  ></div>
</template>

<style scoped>
.indicator {
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: var(--color-positive);
}
.indicator_medium {
  background-color: #e0f144;
}
.indicator_long {
  background-color: var(--color-negative);
}
</style>
