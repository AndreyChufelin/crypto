<script setup lang="ts">
import { useAsset, useAssetHistory } from "../services/assets";
import { useRoute } from "vue-router";
import VueChart from "../components/VueChart.vue";
import ChartChooseInterval from "../components/ChartChooseInterval.vue";
import { ref, watch } from "vue";
import AssetHeader from "@/components/AssetHeader.vue";
import ExchangeTable from "@/components/ExchangeTable.vue";
import { LoadingStatus } from "@/services/base";

const route = useRoute();

const interval = ref("m1");

const { asset, status, getAsset } = useAsset();
const { assetHistory, getAssetHistory } = useAssetHistory();

(async () => {
  await getAsset(route.params.id as string);
  getAssetHistory(route.params.id as string, interval.value);
})();

watch(interval, () => {
  if (asset.value && status.value === LoadingStatus.ready) {
    getAssetHistory(asset.value.id, interval.value);
  }
});
</script>

<template>
  <div class="asset">
    <div class="asset__top">
      <section class="asset__header" v-if="status === 'ready' && asset">
        <AssetHeader :asset="asset" :status="status" />
      </section>
      <VueChart v-if="assetHistory" :data="assetHistory" :interval="interval">
        <template #header><ChartChooseInterval v-model="interval" /></template>
      </VueChart>
    </div>
    <div class="asset__table">
      <ExchangeTable :id="($route.params.id as string)" />
    </div>
  </div>
</template>

<style scoped>
.asset {
  display: flex;
  flex-direction: column;
  row-gap: 45px;
}
.asset__top {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
