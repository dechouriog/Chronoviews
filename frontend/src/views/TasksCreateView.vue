<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { TaskService } from '@/services/TaskService';

import type { CreateTaskDTO } from '@/dtos/CreateTaskDTO';

const router = useRouter();

const name = ref<string>('');
const category = ref<string>('');
const color = ref<string>('#3B82F6');

const predefinedColors: string[] = [
  '#3B82F6',
  '#8B5CF6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#06B6D4',
  '#F97316',
];

function handleSubmit(): void {
  const newTask: CreateTaskDTO = {
    name: name.value.trim(),
    category: category.value.trim(),
    color: color.value,
    totalTime: 0,
    isRunning: false,
    lastStarted: 0,
  };

  TaskService.createTask(newTask);
  router.push({ name: 'tasks' });
}

function selectColor(selected: string): void {
  color.value = selected;
}
</script>

<template>
  <section class="min-h-full bg-gray-950 text-white p-6">

    <!-- header -->
    <div class="flex items-center gap-4 mb-8">
      <RouterLink
        to="/tasks"
        class="text-gray-400 hover:text-white transition duration-200"
      >
        <i class="fas fa-arrow-left text-lg"></i>
      </RouterLink>
      <div>
        <h2 class="text-3xl font-bold text-white">Create Task</h2>
        <p class="text-gray-400 mt-1">Add a new task to track your time</p>
      </div>
    </div>

    <!-- form -->
    <div class="max-w-lg">
      <form @submit.prevent="handleSubmit" class="bg-gray-900 rounded-xl p-8 border border-gray-800 space-y-6">

        <!-- name -->
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-2" for="name">
            Task Name
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            placeholder="e.g. Frontend Development"
            class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>

        <!-- category -->
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-2" for="category">
            Category
          </label>
          <input
            id="category"
            v-model="category"
            type="text"
            required
            placeholder="e.g. Development, Design, Meetings"
            class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>

        <!-- color -->
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-3">
            Color
          </label>
          <div class="flex items-center gap-3 flex-wrap">
            <button
              v-for="preset in predefinedColors"
              :key="preset"
              type="button"
              @click="selectColor(preset)"
              class="w-8 h-8 rounded-full transition duration-200 border-2"
              :style="{ backgroundColor: preset }"
              :class="color === preset ? 'border-white scale-110' : 'border-transparent'"
            ></button>
            <input
              v-model="color"
              type="color"
              class="w-8 h-8 rounded-full cursor-pointer bg-transparent border-2 border-gray-600"
              title="Custom color"
            />
          </div>

          <!-- preview -->
          <div class="flex items-center gap-3 mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
            <span
              class="w-4 h-4 rounded-full flex-shrink-0"
              :style="{ backgroundColor: color }"
            ></span>
            <span class="text-gray-300 text-sm">
              {{ name || 'Task name preview' }}
            </span>
            <span class="text-gray-500 text-xs ml-auto">{{ category || 'Category' }}</span>
          </div>
        </div>

        <!-- actions -->
        <div class="flex gap-3 pt-2">
          <RouterLink
            to="/tasks"
            class="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-lg transition duration-200 text-sm"
          >
            Cancel
          </RouterLink>
          <button
            type="submit"
            class="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-lg transition duration-200 text-sm"
          >
            <i class="fas fa-plus mr-2"></i>
            Create Task
          </button>
        </div>

      </form>
    </div>

  </section>
</template>