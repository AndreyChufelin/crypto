<script setup lang="ts">
import IconSearch from "./icons/IconSearch.vue";

defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div class="search">
    <slot name="icon">
      <button class="search__button" type="submit">
        <IconSearch />
      </button>
    </slot>
    <input
      :value="modelValue"
      @input="onInput"
      class="search__input"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>
.search {
  display: flex;
  background-color: var(--color-background-soft);
  border-radius: 10px;
  width: 100%;
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
  width: 100%;
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
