<script setup lang="ts">
import TableHeaderCell from "./TableHeaderCell.vue";
import type { Cell } from "./VueTable.vue";

defineProps<{
  cells: Array<Cell>;
}>();
</script>

<template>
  <thead class="table-header">
    <tr>
      <TableHeaderCell
        v-for="(cell, index) in cells"
        :key="index"
        :cell="cell"
      />
    </tr>
  </thead>
</template>

<style scoped>
.table-header {
  background-color: var(--color-background-soft);
}
</style>
