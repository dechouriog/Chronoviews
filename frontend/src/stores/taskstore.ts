// Por Diego Chourio

// External
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal
import type { TaskInterface } from '@/interfaces/TaskInterface';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<TaskInterface[]>([]);

  return { tasks };
});