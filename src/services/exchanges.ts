import { ref, watch } from "vue";
import { formatNumber, usdToCurrentCurrency, useRequest } from "./base";
import { currentRate } from "./rates";

interface Exchange {
  exchange: string;
  pair: string;
  price: string;
  volume: string;
  volumePercent: number;
  status: number;
}

export function useExchanges() {
  const exchanges = ref<Exchange[]>([]);
  const { status, message, isEnd, callPagination } = useRequest();
  const lastId = ref<string | null>(null);

  async function getExchanges(id: string | null, page = 1) {
    lastId.value = id ?? null;

    callPagination(
      "markets",
      { parametrs: { baseId: id } },
      page,
      async (data: Array<{ [key: string]: any }>) => {
        data.forEach((exchange) => {
          exchanges.value.push({
            exchange: exchange.exchangeId,
            pair: `${exchange.baseSymbol}/${exchange.quoteSymbol}`,
            price: formatNumber(usdToCurrentCurrency(exchange.priceUsd)),
            volume: formatNumber(usdToCurrentCurrency(exchange.volumeUsd24Hr)),
            volumePercent: +parseFloat(exchange.percentExchangeVolume).toFixed(
              0
            ),
            status: exchange.updated,
          });
        });
      }
    );
  }

  watch(currentRate, () => {
    exchanges.value = [];
    getExchanges(lastId.value);
  });

  return {
    exchanges,
    status,
    message,
    isEnd,
    getExchanges,
  };
}
