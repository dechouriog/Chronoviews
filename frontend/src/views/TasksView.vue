<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import { TaskService } from '@/services/TaskService';

import type { TaskInterface } from '@/interfaces/TaskInterface';

import StatCard from '@/components/StatCard.vue';
import TaskCard from '@/components/TaskCard.vue';

const tasks = computed<TaskInterface[]>(() => TaskService.getTasks());
const tick = ref<number>(0);
const taskToDelete = ref<string | null>(null);

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => { tick.value++; }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

function getLiveTime(task: TaskInterface): number {
  void tick.value;
  if (!task.isRunning) return task.totalTime;
  return task.totalTime + (Date.now() - task.lastStarted);
}

function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function handleToggle(id: string): void {
  TaskService.toggleTask(id);
}

function confirmDelete(id: string): void {
  taskToDelete.value = id;
}

function handleDelete(): void {
  if (!taskToDelete.value) return;
  TaskService.deleteTask(taskToDelete.value);
  taskToDelete.value = null;
}

function cancelDelete(): void {
  taskToDelete.value = null;
}

const totalTimeToday = computed<number>(() => {
  return tasks.value.reduce((total: number, task: TaskInterface) => {
    return total + getLiveTime(task);
  }, 0);
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
      <StatCard
        title="Total Time Today"
        :value="formatTime(totalTimeToday)"
        subtitle="Across all tasks"
        icon="clock"
        icon-color="text-green-400"
      />
      <StatCard
        title="Currently Tracking"
        :value="runningTask ? runningTask.name : '—'"
        :subtitle="runningTask ? 'Timer running' : 'No task running'"
        icon="wave-square"
        icon-color="text-cyan-400"
      />
      <StatCard
        title="Tasks Tracked"
        :value="`${tasksWithTime} / ${tasks.length}`"
        subtitle="Tasks with time logged"
        icon="bolt"
        icon-color="text-orange-400"
      />
    </div>

    <!-- task list -->
    <h3 class="text-xl font-semibold text-white mb-4">Your Tasks</h3>

    <div class="space-y-3">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="flex items-center gap-3"
      >
        <div class="flex-1">
          <TaskCard
            :task="task"
            @toggle="handleToggle"
          />
        </div>
        <button
          @click="confirmDelete(task.id)"
          class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-500/20 border border-gray-700 hover:border-red-500/50 text-gray-500 hover:text-red-400 flex items-center justify-center transition duration-200 flex-shrink-0"
          title="Delete task"
        >
          <i class="fas fa-trash text-xs"></i>
        </button>
      </div>

      <div v-if="tasks.length === 0" class="text-center py-16 text-gray-500">
        <i class="fas fa-clock text-4xl mb-4 block"></i>
        <p class="text-lg">No tasks yet. Create your first task!</p>
      </div>
    </div>

    <!-- delete confirmation modal -->
    <div
      v-if="taskToDelete"
      class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
    >
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800 w-full max-w-sm">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
            <i class="fas fa-trash text-red-400"></i>
          </div>
          <div>
            <p class="text-white font-semibold">Delete Task</p>
            <p class="text-gray-400 text-sm">This action cannot be undone</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button
            @click="cancelDelete"
            class="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-lg transition duration-200 text-sm"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            class="flex-1 bg-red-500 hover:bg-red-400 text-white font-semibold py-2.5 rounded-lg transition duration-200 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

  </section>
</template>