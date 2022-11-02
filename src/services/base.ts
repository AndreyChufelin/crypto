import { ref } from "vue";
import { currentRate } from "./rates";

export enum LoadingStatus {
  ready = "ready",
  loading = "loading",
  error = "error",
  idle = "idle",
}

export function usdToCurrentCurrency(value: number) {
  return String(value / currentRate.value);
}

export function formatNumber(n: string) {
  if (n === null) {
    return "No data";
  }
  const number = parseFloat(n);
  const roundedNumber = String(Math.round(number));
  let rounded = roundedNumber;
  let float = "";
  let value = "";

  if (number > 1_000_000_000_000) {
    value = "t";
    rounded = roundedNumber.slice(0, -12);
    float = roundedNumber.slice(rounded.length, -10);
  } else if (number > 1_000_000_000) {
    value = "b";
    rounded = roundedNumber.slice(0, -9);
    float = roundedNumber.slice(rounded.length, -7);
  } else if (number > 1_000_000) {
    value = "m";
    rounded = roundedNumber.slice(0, -6);
    float = roundedNumber.slice(rounded.length, -4);
  } else {
    return number.toFixed(2);
  }

  return rounded + (float == "00" ? "" : "." + float) + value;
}

interface requestOptions {
  parametrs?: { [key: string]: unknown };
}

export function useRequest() {
  const status = ref(LoadingStatus.idle);
  const isEnd = ref(false);
  const message = ref();

  async function baseCall<T>(
    path: string,
    options: requestOptions,
    cb: (data: T) => void
  ) {
    try {
      status.value = LoadingStatus.loading;
      let url = `https://api.coincap.io/v2/${path}`;

      if (options.parametrs) {
        const parametrs = options.parametrs;

        const parametrsString =
          "?" +
          String(
            Object.keys(parametrs)
              .filter((key) => {
                return parametrs[key] === 0 || Boolean(parametrs[key]);
              })
              .map((key) => {
                return `${key}=${parametrs[key]}`;
              })
          )
            .split(",")
            .join("&");

        url += parametrsString;
      }

      const respones = await fetch(url);

      if (respones.status === 200) {
        const data = await respones.json();

        await cb(data.data);
        status.value = LoadingStatus.ready;
      } else {
        throw { text: "Unexpected error" };
      }
    } catch (error) {
      status.value = LoadingStatus.error;
      message.value = error;
    }
  }

  async function call<T>(
    path: string,
    options: requestOptions,
    cb: (data: T) => void
  ) {
    await baseCall(path, options, async (data: T) => {
      status.value = LoadingStatus.loading;
      await cb(data);
      status.value = LoadingStatus.ready;
    });
  }

  async function callPagination<T>(
    path: string,
    options: requestOptions,
    page: number,
    cb: (data: Array<T>, limit: number, offset: number) => void
  ) {
    try {
      status.value = LoadingStatus.loading;
      const limit = 20;
      const offset = (page - 1) * limit;
      const optionsPagination = {
        ...options,
        parametrs: { ...options.parametrs, limit, offset },
      };

      await baseCall(path, optionsPagination, async (data: Array<T>) => {
        await cb(data, limit, offset);
      });
    } catch (error) {
      status.value = LoadingStatus.error;
      message.value = error;
    }
  }

  return {
    status,
    isEnd,
    message,
    call,
    callPagination,
  };
}
