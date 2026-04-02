<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

import { TaskService } from '@/services/TaskService';
import type { TaskInterface } from '@/interfaces/TaskInterface';

const tasks = computed<TaskInterface[]>(() => TaskService.getTasks());
const tick = ref<number>(0);

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => { tick.value++; }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getLiveTime(task: TaskInterface): number {
  if (!task.isRunning) return task.totalTime;
  return task.totalTime + (Date.now() - task.lastStarted);
}

function handleToggle(id: string): void {
  TaskService.toggleTask(id);
}

const totalTimeToday = computed<number>(() => {
  return tasks.value.reduce((total: number, task: TaskInterface) => {
    return total + getLiveTime(task);
  }, tick.value * 0);
});

const runningTask = computed<TaskInterface | undefined>(() => {
  return tasks.value.find((task: TaskInterface) => task.isRunning);
});

const tasksWithTime = computed<number>(() => {
  return tasks.value.filter((task: TaskInterface) => task.totalTime > 0).length;
});
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <!-- header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold text-white">Time Tracker</h2>
        <p class="text-gray-400 mt-1">Track your time and boost productivity</p>
      </div>
      <RouterLink
        to="/tasks/create"
        class="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2.5 rounded-lg transition duration-200"
      >
        <i class="fas fa-plus"></i>
        Add Task
      </RouterLink>
    </div>

    <!-- stat cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-400 text-sm">Total Time Today</span>
          <i class="fas fa-clock text-green-400"></i>
        </div>
        <p class="text-3xl font-bold text-white">{{ formatTime(totalTimeToday) }}</p>
        <p class="text-gray-500 text-xs mt-1">Across all tasks</p>
      </div>

      <div class="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-400 text-sm">Currently Tracking</span>
          <i class="fas fa-wave-square text-cyan-400"></i>
        </div>
        <p class="text-3xl font-bold text-white">
          {{ runningTask ? runningTask.name : '—' }}
        </p>
        <p class="text-gray-500 text-xs mt-1">
          {{ runningTask ? 'Timer running' : 'No task running' }}
        </p>
      </div>

      <div class="bg-gray-900 rounded-xl p-5 border border-gray-800">
        <div class="flex items-center justify-between mb-3">
          <span class="text-gray-400 text-sm">Tasks Tracked</span>
          <i class="fas fa-bolt text-orange-400"></i>
        </div>
        <p class="text-3xl font-bold text-white">
          {{ tasksWithTime }} / {{ tasks.length }}
        </p>
        <p class="text-gray-500 text-xs mt-1">Tasks with time logged</p>
      </div>
    </div>

    <!-- task list -->
    <h3 class="text-xl font-semibold text-white mb-4">Your Tasks</h3>

    <div class="space-y-3">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="bg-gray-900 rounded-xl p-5 border border-gray-800 flex items-center justify-between transition duration-200"
        :style="{ borderLeftColor: task.color, borderLeftWidth: '4px' }"
      >
        <div class="flex items-center gap-4">
          <button
            @click="handleToggle(task.id)"
            class="w-12 h-12 rounded-full flex items-center justify-center transition duration-200 font-bold"
            :style="task.isRunning
              ? { backgroundColor: task.color }
              : { backgroundColor: '#374151' }"
          >
            <i
              class="text-white text-sm"
              :class="task.isRunning ? 'fas fa-pause' : 'fas fa-play'"
            ></i>
          </button>
          <div>
            <p class="font-semibold text-white text-lg">{{ task.name }}</p>
            <p class="text-gray-400 text-sm">{{ task.category }}</p>
          </div>
        </div>

        <div class="text-right">
          <p
            class="text-2xl font-bold font-mono"
            :style="{ color: task.isRunning ? task.color : '#ffffff' }"
          >
            {{ formatTime(getLiveTime(task)) }}
          </p>
          <p class="text-gray-500 text-xs mt-1">
            {{ task.isRunning ? 'Running' : 'Total time' }}
          </p>
        </div>
      </div>

      <div v-if="tasks.length === 0" class="text-center py-16 text-gray-500">
        <i class="fas fa-clock text-4xl mb-4 block"></i>
        <p class="text-lg">No tasks yet. Create your first task!</p>
      </div>
    </div>

  </section>
</template>