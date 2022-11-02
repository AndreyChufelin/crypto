<script setup lang="ts">
import type { Asset } from "@/services/assets";
import type { LoadingStatus } from "@/services/base";
import { useAppStore } from "@/stores/app";
import IconArrow from "../components/icons/IconArrow.vue";
import TableChangeField from "../components/TableChangeField.vue";

defineProps<{
  asset: Asset;
  status: LoadingStatus;
}>();

const { currencyLable } = useAppStore();
</script>

<template>
  <div class="asset-header">
    <div class="asset-header__description">
      <img
        :src="`https://assets.coincap.io/assets/icons/${asset.name.symbol.toLocaleLowerCase()}@2x.png`"
        alt=""
        class="asset-header__image"
      />
      <div class="asset-header__info">
        <h3 class="asset-header__title">
          {{ asset.name.lable }} ({{ asset.name.symbol }})
        </h3>
        <div class="asset-header__subtitle">
          {{ currencyLable }}{{ asset.price }}
          <span class="asset-header__change">
            <TableChangeField :value="asset.change" />
            <IconArrow
              class="asset-header__change-arrow"
              :class="{
                'asset-header__change-arrow_down': asset.change < 0,
              }"
            />
          </span>
        </div>
      </div>
    </div>
    <ul class="asset-header__stats">
      <li class="asset-header__stats-item">
        Market Cap
        <span class="asset-header__stats-value">
          {{ currencyLable }}{{ asset.marketCap }}
        </span>
      </li>
      <li class="asset-header__stats-item">
        Volume (24Hr)
        <span class="asset-header__stats-value">
          {{ currencyLable }}{{ asset.volume }}
        </span>
      </li>
      <li class="asset-header__stats-item">
        Supply
        <span class="asset-header__stats-value">
          {{ asset.supply }} {{ asset.name.symbol }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.asset__header {
  display: flex;
}
.asset-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.asset-header__description {
  display: flex;
  column-gap: 5px;
}
.asset-header__image {
  width: 64px;
  height: 64px;
}
.asset-header__title {
  font-weight: 700;
  font-size: 1.5rem;
}
.asset-header__subtitle {
  display: flex;
  column-gap: 5px;
  align-items: center;
}
.asset-header__change {
  display: flex;
  align-items: center;
  column-gap: 0.2em;
  font-size: 0.625rem;
}
.asset-header__change-arrow_down {
  fill: var(--color-negative) !important;
  transform: rotate(-90deg) !important;
}
.asset-header__change-arrow {
  fill: var(--color-positive);
  transform: rotate(90deg);
  width: 10px;
  height: 10px;
}
.asset-header__stats {
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
}
.asset-header__stats-item {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  line-height: 1.2;
  color: var(--color-text-soft);
}
.asset-header__stats-value {
  font-weight: 800;
  color: var(--color-text);
}
</style>
