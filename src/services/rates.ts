import { ref } from "vue";
import { useRequest } from "./base";

export interface Rate {
  id: string;
  symbol: string;
  currencySymbol: string | null;
  type: string;
  rateUsd: string;
}

export const usdRate = {
  id: "usd",
  symbol: "usd",
  currencySymbol: "$",
  type: "fiat",
  rateUsd: "1",
};

export const currentRate = ref(1);

export function useRate() {
  const rate = ref<Rate>();
  const { status, call } = useRequest();

  async function getRate(id: string) {
    if (id === "usd") {
      rate.value = usdRate;
      currentRate.value = 1;

      return;
    }
    await call(`rates/${id}`, {}, async (data: Rate) => {
      rate.value = data;
      currentRate.value = +data.rateUsd;
    });
  }

  return {
    rate,
    status,
    getRate,
  };
}

export function useRatesList() {
  const rates = ref<Rate[]>([]);
  const { status, message, call } = useRequest();

  async function getRatesList() {
    call("rates", {}, async (data: Rate[]) => {
      rates.value = data;
    });
  }

  return {
    rates,
    status,
    message,
    getRatesList,
  };
}
