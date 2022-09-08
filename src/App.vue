<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app dark">
    <main class="app__content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
  background-color: var(--color-background);
  font-family: "Inter", sans-serif;
  color: var(--color-text);
}

.app__content {
  box-sizing: content-box;
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 2%;
}
</style>
