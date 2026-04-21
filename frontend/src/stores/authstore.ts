// Por Diego Chourio

// External
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal
import type { UserInterface } from '@/interfaces/UserInterface';

export const useAuthStore = defineStore('auth', () => {
  const registeredUsers = ref<UserInterface[]>([]);

  return { registeredUsers };
});