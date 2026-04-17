// Por Diego Chourio

<script setup lang="ts">

// External imports
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { BarSeriesOption } from 'echarts';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const props = defineProps<{
  categories: CategoryData[];
}>();

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

function formatHours(milliseconds: number): string {
  return `${(milliseconds / 3600000).toFixed(1)}h`;
}

function buildChart(): void {
  if (!chartRef.value) return;

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value, 'dark');
  }

  const sortedCategories = [...props.categories].sort(
    (a: CategoryData, b: CategoryData) => a.value - b.value,
  );

  const series: BarSeriesOption = {
    type: 'bar',
    data: sortedCategories.map((cat: CategoryData) => ({
      value: cat.value,
      itemStyle: { color: cat.color, borderRadius: [0, 6, 6, 0] },
    })),
    barMaxWidth: 32,
    label: {
      show: true,
      position: 'right',
      color: '#9CA3AF',
      fontSize: 11,
      formatter: (params) => formatHours(Number(params.value ?? 0)),
    },
    emphasis: { itemStyle: { opacity: 0.8 } },
  };

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    grid: { left: '2%', right: '12%', top: '4%', bottom: '4%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 11,
        formatter: (value: number) => formatHours(value),
      },
      splitLine: { lineStyle: { color: '#1F2937' } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: sortedCategories.map((cat: CategoryData) => cat.name),
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#9CA3AF', fontSize: 12 },
      axisTick: { show: false },
    },
    series,
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1F2937',
      borderColor: '#374151',
      textStyle: { color: '#F9FAFB' },
      formatter: (params: unknown) => {
        const list = params as { name?: string; value?: unknown }[];
        const param = list[0];
        if (!param) return '';
        return `${param.name ?? ''}: ${formatHours(Number(param.value ?? 0))}`;
      },
    },
  };

  chartInstance.setOption(option);
}

function handleResize(): void {
  chartInstance?.resize();
}

onMounted(() => {
  buildChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  chartInstance?.dispose();
  chartInstance = null;
  window.removeEventListener('resize', handleResize);
});

watch(
  () => props.categories,
  () => { buildChart(); },
  { deep: true },
);
</script>

<template>
  <div ref="chartRef" class="w-full h-64"></div>
</template>