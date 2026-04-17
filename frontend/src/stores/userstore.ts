// Por Diego Chourio

// External
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal
import type { UserInterface } from '@/interfaces/UserInterface';

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInterface | null>(null);

  return { user };
});