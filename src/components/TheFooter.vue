<script setup lang="ts"></script>

<template>
  <footer class="footer"><a class="footer__link" href="#">Github</a></footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-top: 1px solid var(--color-background-soft);
  padding: 20px 5px;
}
.footer__link {
  color: var(--color-additional);
  transition: color 0.25s;
}
.footer__link:hover {
  color: var(--color-font);
}
</style>
