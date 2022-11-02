<script setup lang="ts">
defineEmits(["click"]);
</script>

<template>
  <tr @click="$emit('click')">
    <slot></slot>
  </tr>
  <slot name="bottom"></slot>
</template>

<style scoped>
tr {
  border-bottom: 1px solid var(--color-background-soft-2);
}
.dark tr {
  border-bottom: 1px solid var(--color-background-soft);
}
</style>
