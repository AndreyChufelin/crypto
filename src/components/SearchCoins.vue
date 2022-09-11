<script setup lang="ts">
import IconSearch from "./icons/IconSearch.vue";
</script>

<template>
  <form class="search">
    <button class="search__button" type="submit">
      <IconSearch />
    </button>
    <input class="search__input" type="text" placeholder="Find coins..." />
  </form>
</template>

<style scoped>
.search {
  display: flex;
  background-color: var(--color-background-soft);
  border-radius: 10px;
}
.search__button {
  height: 100%;
  padding: 10px;
  z-index: 1;
  border-radius: 10px;
  position: absolute;
}
.search__input {
  padding: 10px 10px 10px 35px;
  outline: none;
}
.search__input:focus {
  border-radius: 10px;
  outline: 2px solid var(--color-additional);
}
.search__input::placeholder {
  color: var(--color-text-soft);
}
</style>
