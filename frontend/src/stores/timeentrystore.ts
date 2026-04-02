import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { TimeEntryInterface } from '@/interfaces/TimeEntryInterface';

export const useTimeEntryStore = defineStore('timeEntry', () => {
  const timeEntries = ref<TimeEntryInterface[]>([]);

  return { timeEntries };
});