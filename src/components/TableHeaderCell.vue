<script setup lang="ts">
import type { Cell } from "./VueTable.vue";

defineProps<{
  cell: Cell;
}>();
</script>

<template>
  <th
    class="table-header__th"
    :align="cell.align ?? 'center'"
    :colspan="cell.length"
  >
    <div class="table-header__wrapper">
      {{ cell.lable }}
    </div>
  </th>
</template>

<style scoped>
.table-header__wrapper {
  display: flex;
  align-items: center;
  width: fit-content;
  column-gap: 0.35em;
}
.table-header__th:first-child {
  padding: 20px 0 20px 10px;
}
.table-header__th:last-child {
  padding: 20px 20px 20px 0;
}
</style>
