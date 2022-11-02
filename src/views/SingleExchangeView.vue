<script setup lang="ts">
import ExchangeTable from "@/components/ExchangeTable.vue";
import { useExchange } from "@/services/exchanges";
import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";

const route = useRoute();
const { currencyLable } = useAppStore();

const { status, exchange, getExchange } = useExchange();
getExchange(route.params.id as string);
</script>

<template>
  <div class="single-exchange">
    <div v-if="status === 'ready' && exchange" class="single-exchange__header">
      <h2 class="single-exchange__title">
        <span class="single-exchange__title-rank"> #{{ exchange.rank }} </span>
        {{ exchange.name }}
      </h2>
      <div class="single-exchange__info">
        <div class="single-exchange__info-item">
          Volume
          <span class="single-exchange__info-value">
            {{ currencyLable }}{{ exchange.volume }}
          </span>
        </div>
        <div class="single-exchange__info-item">
          Volume(%)
          <span class="single-exchange__info-value">
            {{ exchange.volumePercent }}
          </span>
        </div>
      </div>
    </div>
    <ExchangeTable :exchangeId="$route.params.id as string" />
  </div>
</template>

<style scoped>
.single-exchange {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.single-exchange__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.single-exchange__title {
  font-weight: 800;
  font-size: 2rem;
}
.single-exchange__title-rank {
  font-weight: 800;
  font-size: 0.9em;
  color: var(--color-text-soft);
}
.single-exchange__info {
  display: flex;
  column-gap: 20px;
}

.single-exchange__info-item {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  line-height: 1.2;
  font-weight: 800;
  color: var(--color-text);
}
.single-exchange__info-value {
  color: var(--color-text-soft);
}
</style>
