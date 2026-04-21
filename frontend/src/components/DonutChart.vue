// Por Diego Chourio
<script setup lang="ts">

// External imports
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const props = defineProps<{
  labels: string[];
  data: number[];
  colors: string[];
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart<'doughnut'> | null = null;

function buildChart(): void {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: props.labels,
      datasets: [
        {
          data: props.data,
          backgroundColor: props.colors,
          borderColor: '#111827',
          borderWidth: 3,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '65%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context): string => {
              const label = context.label ?? '';
              const value = context.parsed as number;
              const total = (context.dataset.data as number[]).reduce(
                (sum: number, val: number) => sum + val, 0,
              );
              const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
              return `${label}: ${percentage}%`;
            },
          },
        },
      },
    },
  });
}

onMounted(() => {
  buildChart();
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});

watch(
  () => [props.labels, props.data, props.colors],
  () => { buildChart(); },
  { deep: true },
);
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div class="w-48 h-48">
      <canvas ref="canvasRef"></canvas>
    </div>

    <!-- legend -->
    <div class="flex flex-wrap justify-center gap-3">
      <div
        v-for="(label, index) in props.labels"
        :key="label"
        class="flex items-center gap-2"
      >
        <span
          class="w-3 h-3 rounded-full flex-shrink-0"
          :style="{ backgroundColor: props.colors[index] }"
        ></span>
        <span class="text-gray-300 text-sm">{{ label }}</span>
      </div>
    </div>
  </div>
</template>