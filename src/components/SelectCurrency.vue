<script setup lang="ts">
import { ref, watch } from "vue";
import VueSelect from "./VueSelect.vue";
import { useAppStore } from "@/stores/app";
import SelectCurrencyShowMore from "./SelectCurrencyShowMore.vue";
import { useRate } from "@/services/rates";

const store = useAppStore();
const { rate, getRate } = useRate();

const currency = ref({
  lable: store.currencyLable,
  value: store.rate.id,
});

getRate(currency.value.value);

async function update() {
  await getRate(currency.value.value);

  if (rate.value) {
    store.changeRate(rate.value);
  }
}

watch(
  () => store.rate.id,
  () => {
    currency.value = {
      lable: store.currencyLable,
      value: store.rate.id,
    };
  }
);
</script>

<template>
  <VueSelect
    v-model="currency"
    @update:modelValue="update"
    :options="[
      { lable: '$', value: 'usd' },
      { lable: '€', value: 'euro' },
      { lable: '₽', value: 'russian-ruble' },
    ]"
  >
    <template #additional><SelectCurrencyShowMore /></template>
  </VueSelect>
</template>

<style scoped></style>
