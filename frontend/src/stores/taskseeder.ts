// Por Diego Chourio

// Internal
import type { TaskInterface } from '@/interfaces/TaskInterface';

export const taskSeeder: TaskInterface[] = [
  { id: '1', userId: '1', name: 'Morning Run', color: '#10B981', category: 'Fitness', totalHours: 2.5 },
  { id: '2', userId: '1', name: 'Deep Work Session', color: '#3B82F6', category: 'Work', totalHours: 8 },
  { id: '3', userId: '1', name: 'Vue.js Course', color: '#8B5CF6', category: 'Study', totalHours: 3 },
  { id: '4', userId: '1', name: 'Evening Meditation', color: '#A855F7', category: 'Spirituality', totalHours: 1 },
];