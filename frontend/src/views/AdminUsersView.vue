// Por Diego Chourio
<script setup lang="ts">

// External imports
import { computed } from 'vue';

// Internal imports
import type { TaskInterface } from '@/interfaces/TaskInterface';
import type { UserInterface } from '@/interfaces/UserInterface';
import { AuthService } from '@/services/AuthService';
import { useTaskStore } from '@/stores/taskstore';

const users = computed<UserInterface[]>(() => AuthService.getAllUsers());

function getTaskCountForUser(userId: string): number {
  return useTaskStore().tasks.filter((task: TaskInterface) => task.userId === userId).length;
}

function getTotalHoursForUser(userId: string): number {
  return useTaskStore().tasks
    .filter((task: TaskInterface) => task.userId === userId)
    .reduce((total: number, task: TaskInterface) => total + task.totalHours, 0);
}

function formatHours(hours: number): string {
  return `${hours.toFixed(1)}h`;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

function getRoleBadgeClass(role: string): string {
  return role === 'admin'
    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
    : 'bg-green-500/20 text-green-400 border border-green-500/30';
}
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white">Users</h2>
      <p class="text-gray-400 mt-1">All registered accounts on the platform</p>
    </div>

    <div class="bg-gray-900 rounded-xl border border-gray-800">
      <div class="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h3 class="text-base font-semibold text-white">Registered Users</h3>
          <p class="text-gray-500 text-sm mt-0.5">Full account list</p>
        </div>
        <span class="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full border border-gray-700">
          {{ users.length }} users
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">User</th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Email</th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Role</th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Tasks</th>
              <th class="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-3">Total Hours</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr
              v-for="user in users"
              :key="user.id"
              class="hover:bg-gray-800/50 transition duration-150"
            >
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
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm">{{ user.email }}</span>
              </td>
              <td class="px-6 py-4">
                <span
                  class="text-xs font-medium px-2.5 py-1 rounded-full"
                  :class="getRoleBadgeClass(user.role)"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm">{{ getTaskCountForUser(user.id) }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-gray-300 text-sm">{{ formatHours(getTotalHoursForUser(user.id)) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="users.length === 0" class="text-center py-16 text-gray-500">
        <i class="fas fa-users text-4xl mb-4 block"></i>
        <p>No users registered yet</p>
      </div>
    </div>

  </section>
</template>