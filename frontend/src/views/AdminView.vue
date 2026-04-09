<script setup lang="ts">
import { computed } from 'vue';

import { TaskService } from '@/services/TaskService';
import { UserService } from '@/services/UserService';

import type { TaskInterface } from '@/interfaces/TaskInterface';
import type { UserInterface } from '@/interfaces/UserInterface';

import StatCard from '@/components/StatCard.vue';
import DonutChart from '@/components/DonutChart.vue';

const tasks = computed<TaskInterface[]>(() => TaskService.getTasks());
const users = computed<UserInterface[]>(() => UserService.getAllUsers());
const activeUser = computed<UserInterface | null>(() => UserService.getUser());

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

const donutLabels = computed<string[]>(() =>
  categoryStats.value.map((cat: CategoryStat) => cat.name),
);

const donutData = computed<number[]>(() =>
  categoryStats.value.map((cat: CategoryStat) => cat.totalTime),
);

const donutColors = computed<string[]>(() =>
  categoryStats.value.map((cat: CategoryStat) => cat.color),
);

function getRoleBadgeClass(role: string): string {
  return role === 'admin'
    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    : 'bg-green-500/20 text-green-400 border border-green-500/30';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

function isCurrentUser(user: UserInterface): boolean {
  return activeUser.value?.id === user.id;
}
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
        title="Registered Users"
        :value="`${users.length}`"
        subtitle="Total accounts"
        icon="users"
        icon-color="text-purple-400"
      />
    </div>

    <!-- charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      <!-- donut chart -->
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">
          Global Time Distribution by Category
        </h3>
        <DonutChart
          :labels="donutLabels"
          :data="donutData"
          :colors="donutColors"
        />
      </div>

      <!-- bar chart horizontal (será reemplazado por ECharts en commit 6) -->
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">Hours by Category</h3>
        <div class="space-y-5">
          <div v-for="cat in categoryStats" :key="cat.name">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-400 text-sm w-28 truncate">{{ cat.name }}</span>
              <span class="text-gray-300 text-sm font-medium">
                {{ formatHours(cat.totalTime) }}
              </span>
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

    <!-- users table -->
    <div class="bg-gray-900 rounded-xl border border-gray-800">
      <div class="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white">User Management</h3>
          <p class="text-gray-500 text-sm mt-0.5">All registered accounts</p>
        </div>
        <span class="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full border border-gray-700">
          {{ users.length }} users
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">
                User
              </th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">
                Email
              </th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">
                Role
              </th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">
                Total Tracked
              </th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">
                Tasks
              </th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr
              v-for="user in users"
              :key="user.id"
              class="hover:bg-gray-800/50 transition duration-150"
            >
              <!-- user -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    :class="user.role === 'admin' ? 'bg-purple-500 text-white' : 'bg-green-500 text-black'"
                  >
                    {{ getInitials(user.name) }}
                  </div>
                  <div>
                    <p class="text-white text-sm font-medium">{{ user.name }}</p>
                    <p class="text-gray-500 text-xs">ID: {{ user.id }}</p>
                  </div>
                </div>
              </td>

              <!-- email -->
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm">{{ user.email }}</span>
              </td>

              <!-- role -->
              <td class="px-6 py-4">
                <span
                  class="text-xs font-medium px-2.5 py-1 rounded-full"
                  :class="getRoleBadgeClass(user.role)"
                >
                  {{ user.role }}
                </span>
              </td>

              <!-- total tracked -->
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm">
                  {{ formatHours(user.totalTrackedTime) }}
                </span>
              </td>

              <!-- tasks count -->
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm">{{ user.tasksCount }}</span>
              </td>

              <!-- status -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="isCurrentUser(user) ? 'bg-green-400' : 'bg-gray-600'"
                  ></span>
                  <span
                    class="text-xs"
                    :class="isCurrentUser(user) ? 'text-green-400' : 'text-gray-500'"
                  >
                    {{ isCurrentUser(user) ? 'Online' : 'Offline' }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </section>
</template>