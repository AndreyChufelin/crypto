<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const options = [
  { value: "d1", lable: "1d" },
  { value: "w1", lable: "1w" },
  { value: "m1", lable: "1m" },
  { value: "m3", lable: "3m" },
  { value: "m6", lable: "6m" },
  { value: "y1", lable: "1y" },
];
</script>

<template>
  <div class="choose-interval">
    <button
      v-for="(option, index) in options"
      :key="index"
      class="choose-interval__item"
      :class="{ 'choose-interval__item_active': modelValue === option.value }"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.lable }}
    </button>
  </div>
</template>

<style scoped>
.choose-interval {
  display: flex;
  column-gap: 10px;
}
.choose-interval__item {
  padding: 5px 10px;
  border-radius: 5px;
  transition: background 0.25s;
}
.choose-interval__item:hover {
  background-color: var(--color-background-soft-2) !important;
}
.choose-interval__item_active {
  background-color: var(--color-background-soft-2) !important;
}
</style>
