<script setup lang="ts">
defineProps<{
  value: number;
}>();
</script>

<template>
  <div
    class="change-field"
    :class="{
      'change-field_negative': value < 0,
    }"
  >
    <template v-if="isNaN(value)">No data</template>
    <template v-else>{{ value }}%</template>
  </div>
</template>

<style scoped>
.change-field {
  color: var(--color-positive);
}
.change-field_negative {
  color: var(--color-negative);
}
</style>
