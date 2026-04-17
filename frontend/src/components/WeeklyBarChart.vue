// Por Diego Chourio
<script setup lang="ts">


// External imports
import * as echarts from 'echarts';
import type { BarSeriesOption } from 'echarts';
import { onMounted, onUnmounted, ref, watch } from 'vue';

// Internal imports
// (No hay imports internos en este archivo)

const props = defineProps<{
  days: string[];
  values: number[];
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

  const series: BarSeriesOption = {
    type: 'bar',
    data: props.values,
    barMaxWidth: 40,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#10B981' },
        { offset: 1, color: '#059669' },
      ]),
      borderRadius: [6, 6, 0, 0],
    },
    emphasis: {
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#34D399' },
          { offset: 1, color: '#10B981' },
        ]),
      },
    },
    label: {
      show: true,
      position: 'top',
      color: '#9CA3AF',
      fontSize: 11,
      formatter: (params) => formatHours(Number(params.value ?? 0)),
    },
  };

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    grid: { left: '8%', right: '4%', top: '12%', bottom: '12%' },
    xAxis: {
      type: 'category',
      data: props.days,
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#9CA3AF', fontSize: 12 },
      axisTick: { show: false },
    },
    yAxis: {
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
  () => [props.days, props.values],
  () => { buildChart(); },
  { deep: true },
);
</script>

<template>
  <div ref="chartRef" class="w-full h-64"></div>
</template>