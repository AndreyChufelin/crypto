<script setup lang="ts">
import VueTable from "../components/VueTable.vue";
import TableHeader from "../components/TableHeader.vue";
import { computed, ref, watch, type ThHTMLAttributes } from "vue";
import { useAssets } from "@/services/assets";
import TablePagination from "../components/TablePagination.vue";
import AssetTableRow from "@/components/AssetTableRow.vue";
import { useI18n } from "vue-i18n";
import { onBeforeRouteLeave } from "vue-router";

const props = defineProps<{
  search?: string;
}>();
const { t } = useI18n();

const columns = computed(() => [
  {
    name: "rank",
    lable: t("assetTable.rank"),
    length: 1,
    sortable: true,
  },
  {
    name: "name",
    lable: t("assetTable.name"),
    length: 2,
    sortable: true,
    align: "left" as ThHTMLAttributes["align"],
  },
  {
    name: "price",
    lable: t("assetTable.price"),
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
  {
    name: "marketCap",
    lable: t("assetTable.marketCap"),
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
  {
    name: "vwap",
    lable: t("assetTable.vwap"),
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
  {
    name: "supply",
    lable: t("assetTable.supply"),
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
  {
    name: "volume",
    lable: t("assetTable.volume"),
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
  {
    name: "change",
    lable: t("assetTable.change"),
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
]);

const page = ref(1);
const showChart = ref(null);

const { status, assets, isEnd, message, getAssets, closeWebsocket } =
  useAssets();
getAssets(page.value, props.search);

onBeforeRouteLeave(() => {
  closeWebsocket();
});

watch(page, () => getAssets(page.value, props.search));
</script>

<template>
  <VueTable :status="status">
    <template #header>
      <TableHeader :cells="columns" />
    </template>
    <template #error v-if="status === 'error'">{{ message.text }}</template>
    <template #body v-if="status !== 'error'">
      <AssetTableRow
        v-for="asset in assets"
        :key="asset.id"
        :token="asset"
        :columns="columns"
        v-model="showChart"
      />
    </template>
    <template #footer>
      <TablePagination v-model="page" :status="status" :isEnd="isEnd" />
    </template>
  </VueTable>
</template>

<style scoped></style>
