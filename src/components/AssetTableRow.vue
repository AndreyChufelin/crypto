<script setup lang="ts">
import TableRow from "../components/TableRow.vue";
import TableCell from "../components/TableCell.vue";
import TableCoinName from "../components/TableCoinName.vue";
import TableChangeField from "../components/TableChangeField.vue";
import { useAssetHistory, type Asset } from "@/services/assets";
import type { Cell } from "./VueTable.vue";
import VueChart from "./VueChart.vue";
import { watch } from "vue";
import { useAppStore } from "@/stores/app";
import TablePriceField from "./TablePriceField.vue";

const props = defineProps<{
  columns: Array<Cell>;
  token: Asset;
  modelValue: string | null;
}>();

defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const { currencyLable } = useAppStore();

const { assetHistory, getAssetHistory } = useAssetHistory();

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      getAssetHistory(props.token.id, "y1");
    }
  }
);
</script>

<template>
  <TableRow @click="$emit('update:modelValue', token.id)">
    <TableCell :column="columns[0]">
      {{ token.rank }}
    </TableCell>
    <TableCell :column="columns[1]">
      <RouterLink :to="{ name: 'singleAsset', params: { id: token.id } }">
        <TableCoinName :lable="token.name.lable" :symbol="token.name.symbol" />
      </RouterLink>
    </TableCell>
    <TableCell :column="columns[2]">
      <TablePriceField :price="token.price" />
    </TableCell>
    <TableCell :column="columns[3]">
      {{ currencyLable }}{{ token.marketCap }}
    </TableCell>
    <TableCell :column="columns[4]">
      {{ currencyLable }}{{ token.vwap }}
    </TableCell>
    <TableCell :column="columns[5]">
      {{ token.supply }}
    </TableCell>
    <TableCell :column="columns[6]">
      {{ currencyLable }}{{ token.volume }}
    </TableCell>
    <TableCell :column="columns[7]">
      <TableChangeField :value="token.change" />
    </TableCell>
    <template v-if="modelValue === token.id && assetHistory" #bottom>
      <tr>
        <td colspan="9" v-if="assetHistory">
          <VueChart :data="assetHistory" interval="y1" />
        </td>
      </tr>
    </template>
  </TableRow>
</template>

<style scoped></style>
