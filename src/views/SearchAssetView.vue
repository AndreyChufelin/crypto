<script setup lang="ts">
import AssetsTable from "@/components/AssetsTable.vue";
</script>

<template>
  <div class="search-asset">
    <AssetsTable :search="$route.params.search as string" />
  </div>
</template>

<style scoped></style>
