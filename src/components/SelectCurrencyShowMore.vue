<script setup lang="ts">
import { computed, ref } from "vue";
import VueInput from "./VueInput.vue";
import VuePopup from "./VuePopup.vue";
import SelectCurrencyShowMoreItem from "./SelectCurrencyShowMoreItem.vue";
import { useRatesList, type Rate } from "@/services/rates";

const popup = ref<InstanceType<typeof VuePopup> | null>(null);
const { rates, getRatesList } = useRatesList();

const search = ref("");

const searchRates = computed(() => {
  return rates.value.filter((rate: Rate) => {
    return rate.id.includes(search.value);
  });
});

function openPopup() {
  popup.value?.open();
  getRatesList();
}
function closePopup() {
  popup.value?.close();
}
</script>

<template>
  <button class="show-more" @click="openPopup">...</button>
  <VuePopup ref="popup">
    <div class="popup">
      <VueInput v-model="search" :placeholder="$t('header.find_coins')" />
      <ul class="popup__list">
        <SelectCurrencyShowMoreItem
          v-for="rate in searchRates"
          :key="rate.id"
          :rate="rate"
          @choosed="closePopup"
        />
      </ul>
    </div>
  </VuePopup>
</template>

<style scoped>
.show-more {
  transition: color 0.25s;
}
.show-more:hover {
  color: var(--color-additional);
}
.popup {
  display: flex;
  flex-direction: column;
  height: 70vh;
  row-gap: 15px;
}
.popup__list {
  display: flex;
  row-gap: 5px;
  flex-wrap: wrap;
  overflow: scroll;
}
.popup__item-icon {
  width: 25px;
  height: 25px;
}
</style>
