<script setup lang="ts">
import { computed } from 'vue';

import type { TaskInterface } from '@/interfaces/TaskInterface';

const props = defineProps<{
  tasks: TaskInterface[];
  totalTime: number;
}>();

function getPercentage(taskTime: number): number {
  if (props.totalTime === 0) return 0;
  return Math.round((taskTime / props.totalTime) * 100);
}

function formatHoursMinutes(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${String(minutes).padStart(2, '0')}m`;
}

const tasksWithTime = computed<TaskInterface[]>(() => {
  return props.tasks.filter((task: TaskInterface) => task.totalTime > 0);
});
</script>

<template>
  <div class="space-y-5">
    <div
      v-for="task in tasksWithTime"
      :key="task.id"
    >
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <span
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: task.color }"
          ></span>
          <span class="text-white text-sm font-medium">{{ task.name }}</span>
        </div>
        <div class="text-right">
          <span class="text-white text-sm font-semibold">
            {{ formatHoursMinutes(task.totalTime) }}
          </span>
          <span class="text-gray-500 text-xs ml-2">
            ({{ getPercentage(task.totalTime) }}%)
          </span>
        </div>
      </div>
      <div class="w-full bg-gray-700 rounded-full h-1.5">
        <div
          class="h-1.5 rounded-full transition-all duration-500"
          :style="{
            width: `${getPercentage(task.totalTime)}%`,
            backgroundColor: task.color,
          }"
        ></div>
      </div>
    </div>

    <div v-if="tasksWithTime.length === 0" class="text-center py-8 text-gray-500">
      <p>No data available</p>
    </div>
  </div>
</template>