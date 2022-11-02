<script setup lang="ts">
import { computed, ref, watch, type ThHTMLAttributes } from "vue";
import VueTable from "@/components/VueTable.vue";
import TableHeader from "@/components/TableHeader.vue";
import TableCell from "@/components/TableCell.vue";
import TableRow from "@/components/TableRow.vue";
import TablePagination from "@/components/TablePagination.vue";
import TableStatusField from "@/components/TableStatusField.vue";
import { useAppStore } from "@/stores/app";
import { useExchanges } from "@/services/exchanges";
import { useI18n } from "vue-i18n";

const props = defineProps<{ id?: string }>();

const { t } = useI18n();

const { currencyLable } = useAppStore();

const page = ref(1);

const {
  exchanges,
  isEnd,
  status: statusExchange,
  getExchanges,
} = useExchanges();
getExchanges(props.id ?? null, page.value);

const columns = computed(() => [
  {
    name: "exchange",
    lable: t("assetTable.name"),
    length: 1,
    sortable: true,
    align: "left" as ThHTMLAttributes["align"],
  },
  {
    name: "pair",
    lable: t("exchangeTable.pair"),
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
  {
    name: "price",
    lable: t("assetTable.price"),
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
    name: "volumePercent",
    lable: t("exchangeTable.total") + "(%)",
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
  {
    name: "status",
    lable: t("exchangeTable.status"),
    length: 1,
    sortable: true,
    align: "right" as ThHTMLAttributes["align"],
  },
]);

watch(page, () => {
  getExchanges(props.id ?? null, page.value);
});
</script>

<template>
  <VueTable :status="statusExchange">
    <template #header>
      <TableHeader :cells="columns" />
    </template>
    <template #body>
      <TableRow
        v-for="exchange in exchanges"
        :key="exchange.pair + exchange.exchange"
      >
        <TableCell :column="columns[0]">{{ exchange.exchange }}</TableCell>
        <TableCell :column="columns[1]">{{ exchange.pair }}</TableCell>
        <TableCell :column="columns[2]"
          >{{ currencyLable }}{{ exchange.price }}</TableCell
        >
        <TableCell :column="columns[3]"
          >{{ currencyLable }}{{ exchange.volume }}</TableCell
        >
        <TableCell :column="columns[4]">
          <template v-if="exchange.volumePercent">
            {{ exchange.volumePercent }}%
          </template>
          <template v-else>No data</template>
        </TableCell>
        <TableCell :column="columns[5]">
          <TableStatusField :status="exchange.status" />
        </TableCell>
      </TableRow>
    </template>
    <template #error v-if="statusExchange === 'error'">Error</template>
    <template #footer>
      <TablePagination v-model="page" :status="statusExchange" :isEnd="isEnd" />
    </template>
  </VueTable>
</template>

<style scoped></style>
