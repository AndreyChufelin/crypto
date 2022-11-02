<script setup lang="ts">
import type { LoadingStatus } from "@/services/base";
import type { ThHTMLAttributes } from "vue";

export interface Cell {
  name: string;
  lable: string;
  length: number;
  align?: ThHTMLAttributes["align"];
}
defineProps<{ status: LoadingStatus }>();
</script>

<template>
  <table class="table">
    <slot name="header"></slot>
    <tbody>
      <slot name="body"> </slot>
    </tbody>
  </table>
  <slot name="footer" v-if="status !== 'error'"></slot>
  <div class="table__error" v-if="status === 'error'">
    <slot name="error"></slot>
  </div>
</template>

<style scoped>
.table {
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  border-collapse: collapse;
  border-radius: 20px 20px 0 0;
  width: 1250px;
  margin: 0 auto;
}
.table__error {
  background-color: var(--color-negative);
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
}
</style>
