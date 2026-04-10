<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { TaskService } from '@/services/TaskService';

import type { CreateTaskDTO } from '@/dtos/CreateTaskDTO';

const CATEGORIES: string[] = [
  'Work',
  'Study',
  'Fitness',
  'Health',
  'Nutrition',
  'Meditation',
  'Spirituality',
  'Family',
  'Social',
  'Hobbies',
  'Entertainment',
  'Reading',
  'Finance',
  'Chores',
  'Other',
];

const PRESET_COLORS: string[] = [
  '#3B82F6',
  '#8B5CF6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#06B6D4',
  '#F97316',
  '#A855F7',
  '#84CC16',
];

const router = useRouter();

const name = ref<string>('');
const category = ref<string>(CATEGORIES[0]);
const color = ref<string>(PRESET_COLORS[0]);

const previewName = computed<string>(() => name.value.trim() || 'Task name preview');

function selectColor(preset: string): void {
  color.value = preset;
}

function handleSubmit(): void {
  const newTask: CreateTaskDTO = {
    name: name.value.trim(),
    category: category.value,
    color: color.value,
    totalTime: 0,
    isRunning: false,
    lastStarted: 0,
  };

  TaskService.createTask(newTask);
  router.push({ name: 'tasks' });
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

    <div class="max-w-lg">
      <form
        @submit.prevent="handleSubmit"
        class="bg-gray-900 rounded-xl p-8 border border-gray-800 space-y-6"
      >

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
            placeholder="e.g. Morning Run"
            class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>

        <!-- category -->
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-2" for="category">
            Category
          </label>
          <div class="relative">
            <select
              id="category"
              v-model="category"
              required
              class="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition appearance-none cursor-pointer"
            >
              <option v-for="cat in CATEGORIES" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
            <i class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
          </div>
        </div>

        <!-- color -->
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-3">Color</label>
          <div class="flex items-center gap-3 flex-wrap">
            <button
              v-for="preset in PRESET_COLORS"
              :key="preset"
              type="button"
              @click="selectColor(preset)"
              class="w-8 h-8 rounded-full transition-all duration-200 border-2"
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
        </div>

        <!-- preview -->
        <div>
          <label class="block text-gray-400 text-sm font-medium mb-3">Preview</label>
          <div
            class="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center justify-between"
            :style="{ borderLeftColor: color, borderLeftWidth: '4px' }"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-700">
                <i class="fas fa-play text-white text-xs"></i>
              </div>
              <div>
                <p class="text-white text-sm font-semibold">{{ previewName }}</p>
                <p class="text-gray-400 text-xs">{{ category }}</p>
              </div>
            </div>
            <p class="text-white font-mono text-sm font-bold">00:00:00</p>
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