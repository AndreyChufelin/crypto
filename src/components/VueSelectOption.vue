<script setup lang="ts">
defineProps<{
  value: any;
}>();
defineEmits<{
  (e: "select", value: any): void;
}>();
</script>

<template>
  <button
    @click="$emit('select', value)"
    class="select__options-item"
    placeholder="text"
  >
    <slot />
  </button>
</template>

<style scoped></style>
