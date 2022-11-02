import { ref, watch } from "vue";
import { formatNumber, usdToCurrentCurrency, useRequest } from "./base";
import { currentRate } from "./rates";

export interface Asset {
  id: string;
  rank: number;
  name: { lable: string; symbol: string };
  supply: string;
  marketCap: string;
  volume: string;
  price: string;
  change: number;
  vwap: string;
}

function formatAsset(asset: any) {
  return {
    id: asset.id,
    rank: asset.rank,
    name: { lable: asset.name, symbol: asset.symbol },
    supply: formatNumber(asset.supply),
    marketCap: formatNumber(usdToCurrentCurrency(asset.marketCapUsd)),
    volume: formatNumber(usdToCurrentCurrency(asset.volumeUsd24Hr)),
    price: formatNumber(usdToCurrentCurrency(asset.priceUsd)),
    change: +parseFloat(asset.changePercent24Hr).toFixed(2),
    vwap: formatNumber(usdToCurrentCurrency(asset.vwap24Hr)),
  };
}

export function useAssets() {
  const assets = ref<Asset[]>([]);
  const { status, message, isEnd, callPagination } = useRequest();

  async function getAssets(page = 1, search?: string) {
    await callPagination(
      "assets",
      { parametrs: { search } },
      page,
      async (data) => {
        data.forEach((asset) => {
          assets.value.push(formatAsset(asset));
        });
      }
    );
  }

  watch(
    currentRate,
    () => {
      assets.value = [];
      getAssets();
    },
    { deep: true }
  );

  return {
    status,
    assets,
    message,
    isEnd,
    getAssets,
  };
}

export type AssetHistory = [Date, number];

export function useAsset() {
  const { status, call } = useRequest();
  const asset = ref<Asset>();
  const lastId = ref("");

  async function getAsset(id: string) {
    lastId.value = id;
    await call(`assets/${id}`, {}, async (data) => {
      asset.value = formatAsset(data);
    });
  }

  watch(currentRate, () => {
    asset.value = undefined;
    getAsset(lastId.value);
  });

  return {
    status,
    asset,
    getAsset,
  };
}

export function useAssetHistory() {
  const { status, call } = useRequest();
  const assetHistory = ref<AssetHistory[]>();
  const lastId = ref("");
  const lastInterval = ref("");

  async function getAssetHistory(id: string, interval: string) {
    let endInterval = 0;
    let requestInterval = "d1";
    lastId.value = id;
    lastInterval.value = interval;

    switch (interval[0]) {
      case "y":
        endInterval = 365 * +interval[1];
        break;
      case "m":
        endInterval = 30 * +interval[1];
        break;
      case "w":
        endInterval = 7 * +interval[1];
        requestInterval = "h1";
        break;
      case "d":
        endInterval = 24 * +interval[1];
        requestInterval = "h1";
        break;
    }
    await call(
      `assets/${id}/history`,
      { parametrs: { interval: requestInterval } },
      async (data: Array<{ time: number; priceUsd: string }>) => {
        assetHistory.value = data
          .slice(
            data.length - endInterval > 0 ? data.length - endInterval : 0,
            data.length
          )
          .map((item) => [
            new Date(item.time),
            +usdToCurrentCurrency(+item.priceUsd),
          ]);
      }
    );
  }

  watch(currentRate, () => {
    if (assetHistory.value) {
      assetHistory.value = undefined;
      getAssetHistory(lastId.value, lastInterval.value);
    }
  });

  return {
    status,
    assetHistory,
    getAssetHistory,
  };
}
