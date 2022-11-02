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

  async function getExchanges(
    id: string | null,
    page = 1,
    exchangeId?: string
  ) {
    lastId.value = id ?? null;

    callPagination(
      "markets",
      { parametrs: { baseId: id, exchangeId } },
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

interface SingleExchange {
  id: string;
  rank: string;
  name: string;
  volume: string;
  volumePercent: number;
}

export function useExchange() {
  const { status, call } = useRequest();
  const exchange = ref<SingleExchange>();
  const lastId = ref("");

  async function getExchange(id: string) {
    lastId.value = id;
    await call(`exchanges/${id}`, {}, async (data: any) => {
      exchange.value = {
        id: data.id,
        rank: data.rank,
        name: data.name,
        volume: formatNumber(usdToCurrentCurrency(data.volumeUsd)),
        volumePercent: +parseFloat(data.percentTotalVolume).toFixed(0),
      };
    });
  }

  watch(currentRate, () => {
    exchange.value = undefined;
    getExchange(lastId.value);
  });

  return {
    status,
    exchange,
    getExchange,
  };
}
