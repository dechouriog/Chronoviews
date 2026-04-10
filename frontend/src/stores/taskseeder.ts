import type { TaskInterface } from '@/interfaces/TaskInterface';

export const taskSeeder: TaskInterface[] = [
  {
    id: '1',
    userId: '1',
    name: 'Morning Run',
    color: '#10B981',
    category: 'Fitness',
    totalTime: 3600000,
    isRunning: false,
    lastStarted: 0,
  },
  {
    id: '2',
    userId: '1',
    name: 'Deep Work Session',
    color: '#3B82F6',
    category: 'Work',
    totalTime: 7200000,
    isRunning: false,
    lastStarted: 0,
  },
  {
    id: '3',
    userId: '1',
    name: 'Vue.js Course',
    color: '#8B5CF6',
    category: 'Study',
    totalTime: 2700000,
    isRunning: false,
    lastStarted: 0,
  },
  {
    id: '4',
    userId: '1',
    name: 'Evening Meditation',
    color: '#A855F7',
    category: 'Spirituality',
    totalTime: 1800000,
    isRunning: false,
    lastStarted: 0,
  },
];