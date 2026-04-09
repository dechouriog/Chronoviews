import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { UserInterface } from '@/interfaces/UserInterface';

export const useAuthStore = defineStore('auth', () => {
  const registeredUsers = ref<UserInterface[]>([]);

  return { registeredUsers };
});