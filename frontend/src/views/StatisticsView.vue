<script setup lang="ts">
import { ref, computed } from 'vue';

import { TaskService } from '@/services/TaskService';

import type { TaskInterface } from '@/interfaces/TaskInterface';

import StatCard from '@/components/StatCard.vue';

const activeTab = ref<'distribution' | 'weekly'>('distribution');

const tasks = computed<TaskInterface[]>(() => TaskService.getTasks());

const totalWeekTime = computed<number>(() => {
  return tasks.value.reduce((total: number, task: TaskInterface) => total + task.totalTime, 0);
});

const dailyAverage = computed<number>(() => totalWeekTime.value / 7);

const mostProductiveTask = computed<TaskInterface | undefined>(() => {
  return tasks.value.reduce(
    (best: TaskInterface | undefined, task: TaskInterface) =>
      !best || task.totalTime > best.totalTime ? task : best,
    undefined,
  );
});

function formatHours(milliseconds: number): string {
  return `${(milliseconds / 3600000).toFixed(1)}h`;
}

function formatHoursMinutes(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${String(minutes).padStart(2, '0')}m`;
}

function getPercentage(taskTime: number): number {
  if (totalWeekTime.value === 0) return 0;
  return Math.round((taskTime / totalWeekTime.value) * 100);
}

const DONUT_RADIUS = 80;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

interface DonutSlice {
  taskId: string;
  name: string;
  color: string;
  percentage: number;
  offset: number;
}

const donutSlices = computed<DonutSlice[]>(() => {
  let accumulated = 0;
  return tasks.value
    .filter((task: TaskInterface) => task.totalTime > 0)
    .map((task: TaskInterface) => {
      const percentage = getPercentage(task.totalTime);
      const offset = DONUT_CIRCUMFERENCE - (accumulated / 100) * DONUT_CIRCUMFERENCE;
      accumulated += percentage;
      return { taskId: task.id, name: task.name, color: task.color, percentage, offset };
    });
});

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weeklyData = computed<number[]>(() => {
  const base = totalWeekTime.value / 7;
  return weekDays.map((_: string, index: number) => {
    const variation = 0.5 + (((index * 37 + 13) % 100) / 100);
    return base * variation;
  });
});

const maxWeeklyTime = computed<number>(() => Math.max(...weeklyData.value));
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <!-- header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white">Statistics</h2>
      <p class="text-gray-400 mt-1">Analyze how you spend your time</p>
    </div>

    <!-- stat cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="This Week"
        :value="formatHours(totalWeekTime)"
        subtitle="Total tracked"
        icon="calendar"
        icon-color="text-green-400"
      />
      <StatCard
        title="Daily Average"
        :value="formatHours(dailyAverage)"
        subtitle="Per day"
        icon="clock"
        icon-color="text-cyan-400"
      />
      <StatCard
        title="Most Productive"
        :value="mostProductiveTask ? mostProductiveTask.name : '—'"
        :subtitle="mostProductiveTask ? formatHours(mostProductiveTask.totalTime) : 'No data'"
        icon="arrow-trend-up"
        icon-color="text-orange-400"
      />
      <StatCard
        title="Tasks Tracked"
        :value="`${tasks.length}`"
        subtitle="Active tasks"
        icon="bullseye"
        icon-color="text-purple-400"
      />
    </div>

    <!-- tabs -->
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

    <!-- time distribution tab -->
    <div v-if="activeTab === 'distribution'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">Time by Task</h3>
        <div class="flex justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#1f2937" stroke-width="32" />
            <circle
              v-for="(slice, index) in donutSlices"
              :key="index"
              cx="100" cy="100" r="80"
              fill="none"
              :stroke="slice.color"
              stroke-width="32"
              :stroke-dasharray="`${(slice.percentage / 100) * DONUT_CIRCUMFERENCE} ${DONUT_CIRCUMFERENCE}`"
              :stroke-dashoffset="slice.offset"
              transform="rotate(-90 100 100)"
              stroke-linecap="butt"
            />
          </svg>
        </div>
      </div>

      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">Task Breakdown</h3>
        <div class="space-y-5">
          <div
            v-for="task in tasks.filter((t: TaskInterface) => t.totalTime > 0)"
            :key="task.id"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: task.color }"></span>
                <span class="text-white text-sm font-medium">{{ task.name }}</span>
              </div>
              <div class="text-right">
                <span class="text-white text-sm font-semibold">{{ formatHoursMinutes(task.totalTime) }}</span>
                <span class="text-gray-500 text-xs ml-2">({{ getPercentage(task.totalTime) }}%)</span>
              </div>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-1.5">
              <div
                class="h-1.5 rounded-full transition-all duration-500"
                :style="{ width: `${getPercentage(task.totalTime)}%`, backgroundColor: task.color }"
              ></div>
            </div>
          </div>
          <div v-if="tasks.length === 0" class="text-center py-8 text-gray-500">
            <p>No data available</p>
          </div>
        </div>
      </div>
    </div>

    <!-- weekly overview tab -->
    <div v-if="activeTab === 'weekly'" class="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h3 class="text-lg font-semibold text-white mb-6">Weekly Overview</h3>
      <div class="flex items-end justify-around gap-3 h-48">
        <div
          v-for="(dayTime, index) in weeklyData"
          :key="weekDays[index]"
          class="flex flex-col items-center gap-2 flex-1"
        >
          <span class="text-gray-400 text-xs">{{ formatHours(dayTime) }}</span>
          <div
            class="w-full bg-gray-700 rounded-t-md transition-all duration-500"
            :style="{
              height: maxWeeklyTime > 0 ? `${(dayTime / maxWeeklyTime) * 140}px` : '4px',
              backgroundColor: '#10B981',
            }"
          ></div>
          <span class="text-gray-400 text-xs">{{ weekDays[index] }}</span>
        </div>
      </div>
    </div>

  </section>
</template>