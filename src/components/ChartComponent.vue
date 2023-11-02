<template>
  <div class="card mt-5">
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      class="h-30rem"
    />
  </div>
</template>

<script setup lang="ts">
import api from "@/api/api";
import Chart from "primevue/chart";
import { ref, onMounted } from "vue";

const props = defineProps({
  partnerId: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  const charData = ref({
    labels: ["January"],
    datasets: [
      {
        label: "КОМИССИОННЫЙ МАГАЗИН",
        data: [30],
        fill: false,
        borderColor: documentStyle.getPropertyValue("--blue-500"),
        tension: 0.4,
      },
    ],
  });
  if (props.partnerId)
    api.get<IChartModel[]>(`reports/graph/${props.partnerId}`).then((res) => {
      charData.value.labels = res.data.map((l) => l.name);
      charData.value.datasets[0] = {
        ...charData.value.datasets[0],
        data: res.data.map((l) => l.value),
      };
    });

  return charData.value;
};
interface IChartModel {
  name: string;
  value: number;
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
onMounted(() => {
  setChartData();
});
</script>

<style scoped></style>
