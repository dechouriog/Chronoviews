import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { UserInterface } from '@/interfaces/UserInterface';

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInterface | null>(null);

  return { user };
});