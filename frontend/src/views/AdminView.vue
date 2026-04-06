<script setup lang="ts">
import { computed } from 'vue';

import { TaskService } from '@/services/TaskService';
import { UserService } from '@/services/UserService';

import type { TaskInterface } from '@/interfaces/TaskInterface';

import StatCard from '@/components/StatCard.vue';

const tasks = computed<TaskInterface[]>(() => TaskService.getTasks());
const user = computed(() => UserService.getUser());

const totalTrackedHours = computed<number>(() => {
  const totalMs = tasks.value.reduce(
    (total: number, task: TaskInterface) => total + task.totalTime, 0,
  );
  return totalMs / 3600000;
});

const uniqueCategories = computed<string[]>(() => TaskService.getUniqueCategories());

const topCategory = computed<string>(() => {
  const categoryTime: Record<string, number> = {};
  tasks.value.forEach((task: TaskInterface) => {
    categoryTime[task.category] = (categoryTime[task.category] ?? 0) + task.totalTime;
  });
  const sorted = Object.entries(categoryTime).sort(([, a], [, b]) => b - a);
  return sorted[0]?.[0] ?? '—';
});

interface CategoryStat {
  name: string;
  color: string;
  totalTime: number;
  percentage: number;
}

const categoryStats = computed<CategoryStat[]>(() => {
  const categoryMap: Record<string, { totalTime: number; color: string }> = {};
  tasks.value.forEach((task: TaskInterface) => {
    if (!categoryMap[task.category]) {
      categoryMap[task.category] = { totalTime: 0, color: task.color };
    }
    categoryMap[task.category].totalTime += task.totalTime;
  });
  const totalMs = tasks.value.reduce(
    (total: number, task: TaskInterface) => total + task.totalTime, 0,
  );
  return Object.entries(categoryMap).map(([name, data]) => ({
    name,
    color: data.color,
    totalTime: data.totalTime,
    percentage: totalMs > 0 ? Math.round((data.totalTime / totalMs) * 100) : 0,
  }));
});

const maxCategoryTime = computed<number>(() => {
  return Math.max(...categoryStats.value.map((cat: CategoryStat) => cat.totalTime), 1);
});

function formatHours(milliseconds: number): string {
  return `${(milliseconds / 3600000).toFixed(1)}h`;
}

const DONUT_RADIUS = 80;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

interface DonutSlice {
  name: string;
  color: string;
  percentage: number;
  offset: number;
}

const donutSlices = computed<DonutSlice[]>(() => {
  let accumulated = 0;
  return categoryStats.value.map((cat: CategoryStat) => {
    const offset = DONUT_CIRCUMFERENCE - (accumulated / 100) * DONUT_CIRCUMFERENCE;
    accumulated += cat.percentage;
    return { name: cat.name, color: cat.color, percentage: cat.percentage, offset };
  });
});
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <!-- header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white">Admin</h2>
      <p class="text-gray-400 mt-1">Global overview of all tracked activity</p>
    </div>

    <!-- stat cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Hours Tracked"
        :value="`${totalTrackedHours.toFixed(0)}h`"
        subtitle="All users combined"
        icon="clock"
        icon-color="text-green-400"
      />
      <StatCard
        title="Categories"
        :value="`${uniqueCategories.length}`"
        subtitle="Active categories"
        icon="layer-group"
        icon-color="text-blue-400"
      />
      <StatCard
        title="Top Category"
        :value="topCategory"
        subtitle="Most time spent"
        icon="arrow-trend-up"
        icon-color="text-orange-400"
      />
      <StatCard
        title="Active Users"
        :value="user ? '1' : '0'"
        subtitle="Tracking time"
        icon="users"
        icon-color="text-purple-400"
      />
    </div>

    <!-- charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- donut chart -->
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">Global Time Distribution by Category</h3>
        <div class="flex justify-center mb-6">
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
        <div class="flex flex-wrap justify-center gap-4">
          <div v-for="cat in categoryStats" :key="cat.name" class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: cat.color }"></span>
            <span class="text-gray-300 text-sm">{{ cat.name }} {{ cat.percentage }}%</span>
          </div>
        </div>
      </div>

      <!-- bar chart horizontal -->
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">Hours by Category</h3>
        <div class="space-y-5">
          <div v-for="cat in categoryStats" :key="cat.name">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm w-28 truncate">{{ cat.name }}</span>
              <span class="text-gray-300 text-sm font-medium">{{ formatHours(cat.totalTime) }}</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-4">
              <div
                class="h-4 rounded-full transition-all duration-500"
                :style="{
                  width: `${(cat.totalTime / maxCategoryTime) * 100}%`,
                  backgroundColor: cat.color,
                }"
              ></div>
            </div>
          </div>
          <div v-if="categoryStats.length === 0" class="text-center py-8 text-gray-500">
            <p>No data available</p>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>