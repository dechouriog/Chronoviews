// Por Diego Chourio
<script setup lang="ts">

// External imports
import { computed, onMounted, ref } from 'vue';

// Internal imports
import CategoryBarChart from '@/components/CategoryBarChart.vue';
import DonutChart from '@/components/DonutChart.vue';
import StatCard from '@/components/StatCard.vue';
import type { TaskInterface } from '@/interfaces/TaskInterface';
import type { UserInterface } from '@/interfaces/UserInterface';
import { UserService } from '@/services/UserService';
import { TaskService } from '@/services/TaskService';

const users = ref<UserInterface[]>([]);
const allTasks = ref<TaskInterface[]>([]);

onMounted(async () => {
  users.value = await UserService.getAllUsers();
  const tasksByUser = await Promise.all(
    users.value.map((user: UserInterface) => TaskService.getTasksByUserId(user.id)),
  );
  allTasks.value = tasksByUser.flat();
});

const totalHours = computed<number>(() => {
  return allTasks.value.reduce((total: number, task: TaskInterface) => total + task.totalHours, 0);
});

const uniqueCategories = computed<string[]>(() => {
  return Array.from(new Set(allTasks.value.map((task: TaskInterface) => task.category)));
});

const topCategory = computed<string>(() => {
  const categoryHours: Record<string, number> = {};
  allTasks.value.forEach((task: TaskInterface) => {
    categoryHours[task.category] = (categoryHours[task.category] ?? 0) + task.totalHours;
  });
  const sorted = Object.entries(categoryHours).sort(([, a], [, b]) => b - a);
  return sorted[0]?.[0] ?? '—';
});

interface CategoryStat {
  name: string;
  color: string;
  totalHours: number;
  percentage: number;
}

const categoryStats = computed<CategoryStat[]>(() => {
  const categoryMap: Record<string, { totalHours: number; color: string }> = {};
  allTasks.value.forEach((task: TaskInterface) => {
    const existing = categoryMap[task.category];
    if (!existing) {
      categoryMap[task.category] = { totalHours: task.totalHours, color: task.color };
    } else {
      existing.totalHours += task.totalHours;
    }
  });
  const total = allTasks.value.reduce(
    (sum: number, task: TaskInterface) => sum + task.totalHours, 0,
  );
  return Object.entries(categoryMap).map(([name, data]) => ({
    name,
    color: data.color,
    totalHours: data.totalHours,
    percentage: total > 0 ? Math.round((data.totalHours / total) * 100) : 0,
  }));
});

const donutLabels = computed<string[]>(() =>
  categoryStats.value.map((cat: CategoryStat) => cat.name),
);

const donutData = computed<number[]>(() =>
  categoryStats.value.map((cat: CategoryStat) => cat.totalHours),
);

const donutColors = computed<string[]>(() =>
  categoryStats.value.map((cat: CategoryStat) => cat.color),
);

const barChartData = computed(() =>
  categoryStats.value.map((cat: CategoryStat) => ({
    name: cat.name,
    value: cat.totalHours,
    color: cat.color,
  })),
);
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white">Admin</h2>
      <p class="text-gray-400 mt-1">Global overview of all tracked activity</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Hours Tracked"
        :value="`${totalHours.toFixed(1)}h`"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-6">Global Time Distribution by Category</h3>
        <DonutChart :labels="donutLabels" :data="donutData" :colors="donutColors" />
      </div>
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 class="text-lg font-semibold text-white mb-2">Hours by Category</h3>
        <p class="text-gray-500 text-sm mb-4">Sorted by time spent</p>
        <CategoryBarChart :categories="barChartData" />
      </div>
    </div>

  </section>
</template>