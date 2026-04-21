// Por Diego Chourio
<script setup lang="ts">

// External imports
import { computed } from 'vue';

// Internal imports
import type { TaskInterface } from '@/interfaces/TaskInterface';

const props = defineProps<{
  tasks: TaskInterface[];
  totalTime: number;
}>();

function getPercentage(taskHours: number): number {
  if (props.totalTime === 0) return 0;
  return Math.round((taskHours / props.totalTime) * 100);
}

function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${String(m).padStart(2, '0')}m` : `${h}h`;
}

const tasksWithHours = computed<TaskInterface[]>(() => {
  return props.tasks.filter((task: TaskInterface) => task.totalHours > 0);
});
</script>

<template>
  <div class="space-y-5">
    <div v-for="task in tasksWithHours" :key="task.id">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: task.color }"></span>
          <span class="text-white text-sm font-medium">{{ task.name }}</span>
        </div>
        <div class="text-right">
          <span class="text-white text-sm font-semibold">{{ formatHours(task.totalHours) }}</span>
          <span class="text-gray-500 text-xs ml-2">({{ getPercentage(task.totalHours) }}%)</span>
        </div>
      </div>
      <div class="w-full bg-gray-700 rounded-full h-1.5">
        <div
          class="h-1.5 rounded-full transition-all duration-500"
          :style="{ width: `${getPercentage(task.totalHours)}%`, backgroundColor: task.color }"
        ></div>
      </div>
    </div>

    <div v-if="tasksWithHours.length === 0" class="text-center py-8 text-gray-500">
      <p>No data available</p>
    </div>
  </div>
</template>