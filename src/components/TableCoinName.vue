<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  lable: string;
  symbol: string;
}>();

const symbolLowerCase = computed(() => props.symbol.toLocaleLowerCase());
</script>

<template>
  <a class="coin">
    <img
      class="coin__icon"
      width="25px"
      height="25px"
      :src="`https://assets.coincap.io/assets/icons/${symbolLowerCase}@2x.png`"
    />
    <div class="coin__info">
      {{ lable }}
      <p class="coin__subtitle">{{ symbol }}</p>
    </div>
  </a>
</template>

<style scoped>
.coin {
  display: flex;
  height: 100%;
}
.coin__info {
  line-height: 1.2;
  font-weight: 800;
  transition: color 0.25s;
}
.coin__info:hover {
  color: var(--color-additional);
}
.coin__subtitle {
  color: var(--color-text-soft);
  font-size: 0.714rem;
}
.coin__icon {
  width: 25px;
  height: 25px;
  margin-right: 5px;
}
</style>
