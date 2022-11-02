<script setup lang="ts">
import type { LoadingStatus } from "@/services/base";
import IconArrow from "./icons/IconArrow.vue";
import IconLoader from "./icons/IconLoader.vue";

defineProps<{
  modelValue: number;
  status: LoadingStatus;
  isEnd: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();
</script>

<template>
  <button
    v-if="!isEnd"
    class="table-pagination"
    @click="$emit('update:modelValue', modelValue + 1)"
  >
    <IconLoader
      v-if="status === 'loading'"
      class="table-pagination__loader-icon"
    />
    <IconArrow v-else class="table-pagination__icon" />
  </button>
</template>

<style scoped>
.table-pagination {
  display: flex;
  justify-content: center;
  line-height: 1;
  letter-spacing: 5px;
  font-size: 1.5rem;
  font-weight: 800;
  background-color: var(--color-background-soft);
  padding: 10px;
  width: 100%;
  border-radius: 0 0 20px 20px;
  transition: background 0.25s;
}
.table-pagination:hover {
  background-color: var(--color-background-soft-2);
}
.table-pagination:hover .table-pagination__icon {
  fill: var(--color-additional);
}
.table-pagination__icon {
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);
  transition: fill 0.25s;
}
.table-pagination__loader-icon {
  width: 20px;
  height: 20px;
}
</style>
