<script setup lang="ts">
import type { AssetHistory } from "@/services/assets";
import { useAppStore } from "@/stores/app";
import { onMounted, watch } from "vue";
import "../assets/google-charts.js";

const props = defineProps<{
  data: AssetHistory[];
  interval: string;
}>();

let format = "MMM";
function setFormat() {
  if (props.interval) {
    if (props.interval[0] === "w" || props.interval[0] === "d") {
      format = "hh:mm";
    } else if (props.interval === "m1") {
      format = "MMM dd";
    } else if (props.interval[0] === "m") {
      format = "MMM";
    }
  }
}
setFormat();

watch(
  () => props.data,
  () => {
    setFormat();
  }
);

const appStore = useAppStore();

function drawChart() {
  google.charts.load("current", {
    packages: ["corechart"],
    language: appStore.language,
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    const data = google.visualization.arrayToDataTable([
      ["Month", "Price"],
      ...props.data,
    ]);

    const options = {
      curveType: "function",
      legend: { position: "none" },
      fontName: "Inter",
      fontSize: 14,
      chartArea: {
        height: "100%",
        width: "100%",
        top: 15,
        bottom: 30,
      },
      hAxis: {
        format: format,
        textStyle: {
          color: "#ffffff",
        },
        gridlines: {
          color: "transparent",
        },
        minorGridlines: {
          count: 0,
        },
      },
      vAxis: {
        format: "short",
        textPosition: "in",
        textStyle: {
          color: "#ffffff",
        },
        gridlines: {
          color: "transparent",
        },
      },
      series: {
        0: { color: "#d19cff" },
      },

      backgroundColor: "#1f2026",
    };

    const chart = new google.visualization.AreaChart(
      document.getElementById("chart_div")
    );

    chart.draw(data, options);
  }
}
onMounted(() => {
  drawChart();
});

window.addEventListener("resize", () => {
  drawChart();
});

watch(
  () => props.data,
  () => {
    drawChart();
  }
);
</script>

<template>
  <section class="chart">
    <div class="chart__toolbar">
      <slot name="header"></slot>
    </div>
    <div id="chart_div"></div>
  </section>
</template>

<style scoped>
.chart {
  background-color: var(--color-background-soft);
  padding: 25px 50px;
  border-radius: 20px;
}
#chart_div {
  width: 100%;
  height: 400px;
}
</style>
