<script setup lang="ts">
import { computed, ref } from 'vue';

import { TaskService } from '@/services/TaskService';
import { UserService } from '@/services/UserService';

import type { TaskInterface } from '@/interfaces/TaskInterface';

import StatCard from '@/components/StatCard.vue';
import TaskBreakdown from '@/components/TaskBreakdown.vue';
import DonutChart from '@/components/DonutChart.vue';
import WeeklyBarChart from '@/components/WeeklyBarChart.vue';

const activeTab = ref<'distribution' | 'weekly'>('distribution');

const userId = computed<string>(() => UserService.getUser()?.id ?? '');
const tasks = computed<TaskInterface[]>(() => TaskService.getTasksByUserId(userId.value));

const totalHours = computed<number>(() => {
  return tasks.value.reduce((total: number, task: TaskInterface) => total + task.totalHours, 0);
});

const dailyAverage = computed<number>(() => totalHours.value / 7);

const mostProductiveTask = computed<TaskInterface | undefined>(() => {
  return tasks.value.reduce(
    (best: TaskInterface | undefined, task: TaskInterface) =>
      !best || task.totalHours > best.totalHours ? task : best,
    undefined,
  );
});

function formatHours(hours: number): string {
  return `${hours.toFixed(1)}h`;
}

const donutLabels = computed<string[]>(() =>
  tasks.value.filter((t: TaskInterface) => t.totalHours > 0).map((t: TaskInterface) => t.name),
);

const donutData = computed<number[]>(() =>
  tasks.value.filter((t: TaskInterface) => t.totalHours > 0).map((t: TaskInterface) => t.totalHours),
);

const donutColors = computed<string[]>(() =>
  tasks.value.filter((t: TaskInterface) => t.totalHours > 0).map((t: TaskInterface) => t.color),
);

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weeklyValues = computed<number[]>(() => {
  const base = totalHours.value / 7;
  return weekDays.map((_: string, index: number) => {
    const variation = 0.5 + (((index * 37 + 13) % 100) / 100);
    return base * variation;
  });
});
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white">Statistics</h2>
      <p class="text-gray-400 mt-1">Analyze how you spend your time</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Hours"
        :value="formatHours(totalHours)"
        subtitle="All tasks combined"
        icon="clock"
        icon-color="text-green-400"
      />
      <StatCard
        title="Daily Average"
        :value="formatHours(dailyAverage)"
        subtitle="Per day"
        icon="chart-line"
        icon-color="text-cyan-400"
      />
      <StatCard
        title="Most Time Spent"
        :value="mostProductiveTask ? mostProductiveTask.name : '—'"
        :subtitle="mostProductiveTask ? formatHours(mostProductiveTask.totalHours) : 'No data'"
        icon="arrow-trend-up"
        icon-color="text-orange-400"
      />
      <StatCard
        title="Tasks"
        :value="`${tasks.length}`"
        subtitle="Active tasks"
        icon="bullseye"
        icon-color="text-purple-400"
      />
    </div>

    <div class="flex gap-2 mb-6">
      <button
        @click="activeTab = 'distribution'"
        class="px-5 py-2 rounded-lg font-medium text-sm transition duration-200"
        :class="activeTab === 'distribution' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
      >
        Time Distribution
      </button>
      <button
        @click="activeTab = 'weekly'"
        class="px-5 py-2 rounded-lg font-medium text-sm transition duration-200"
        :class="activeTab === 'weekly' ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'"
      >
        Weekly Overview
      </button>
    </div>

    <div v-if="activeTab === 'distribution'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">Time by Task</h3>
        <DonutChart :labels="donutLabels" :data="donutData" :colors="donutColors" />
      </div>
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">Task Breakdown</h3>
        <TaskBreakdown :tasks="tasks" :total-time="totalHours" />
      </div>
    </div>

    <div v-if="activeTab === 'weekly'" class="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h3 class="text-lg font-semibold text-white mb-2">Weekly Overview</h3>
      <p class="text-gray-500 text-sm mb-4">Estimated time per day</p>
      <WeeklyBarChart :days="weekDays" :values="weeklyValues" />
    </div>

  </section>
</template>