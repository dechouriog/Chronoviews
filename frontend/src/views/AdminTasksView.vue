<script setup lang="ts">
import { computed } from 'vue';

import { AuthService } from '@/services/AuthService';
import { useTaskStore } from '@/stores/taskstore';

import type { TaskInterface } from '@/interfaces/TaskInterface';
import type { UserInterface } from '@/interfaces/UserInterface';

const allTasks = computed<TaskInterface[]>(() => useTaskStore().tasks);
const allUsers = computed<UserInterface[]>(() => AuthService.getAllUsers());

function getUserName(userId: string): string {
  const user = allUsers.value.find((u: UserInterface) => u.id === userId);
  return user?.name ?? 'Unknown';
}

function formatHoursMinutes(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${String(minutes).padStart(2, '0')}m`;
}
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <!-- header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white">Tasks</h2>
      <p class="text-gray-400 mt-1">All tasks across every user account</p>
    </div>

    <!-- table -->
    <div class="bg-gray-900 rounded-xl border border-gray-800">
      <div class="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h3 class="text-base font-semibold text-white">All Tasks</h3>
          <p class="text-gray-500 text-sm mt-0.5">Global task registry</p>
        </div>
        <span class="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full border border-gray-700">
          {{ allTasks.length }} tasks
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Task</th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Category</th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Owner</th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Total Time</th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr
              v-for="task in allTasks"
              :key="task.id"
              class="hover:bg-gray-800/50 transition duration-150"
            >
              <!-- task -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <span
                    class="w-3 h-3 rounded-full flex-shrink-0"
                    :style="{ backgroundColor: task.color }"
                  ></span>
                  <div>
                    <p class="text-white text-sm font-medium">{{ task.name }}</p>
                    <p class="text-gray-500 text-xs">ID: {{ task.id }}</p>
                  </div>
                </div>
              </td>

              <!-- category -->
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm">{{ task.category }}</span>
              </td>

              <!-- owner -->
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm">{{ getUserName(task.userId) }}</span>
              </td>

              <!-- total time -->
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm font-mono">
                  {{ formatHoursMinutes(task.totalTime) }}
                </span>
              </td>

              <!-- status -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="task.isRunning ? 'bg-green-400' : 'bg-gray-600'"
                  ></span>
                  <span
                    class="text-xs"
                    :class="task.isRunning ? 'text-green-400' : 'text-gray-500'"
                  >
                    {{ task.isRunning ? 'Running' : 'Idle' }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="allTasks.length === 0" class="text-center py-16 text-gray-500">
        <i class="fas fa-tasks text-4xl mb-4 block"></i>
        <p>No tasks created yet</p>
      </div>
    </div>

  </section>
</template>