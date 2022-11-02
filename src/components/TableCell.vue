<script setup lang="ts">
import type { Cell } from "./VueTable.vue";

defineProps<{
  column: Cell;
}>();
</script>

<template>
  <td :align="column.align ?? 'center'" :colspan="column.length">
    <slot>{{ column.lable }}</slot>
  </td>
</template>

<style scoped>
td:first-child {
  padding: 20px 0 20px 10px;
}
td:last-child {
  padding: 20px 20px 20px 0;
}
</style>
