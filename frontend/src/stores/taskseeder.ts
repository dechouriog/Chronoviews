import type { TaskInterface } from '@/interfaces/TaskInterface';

export const taskSeeder: TaskInterface[] = [
  {
    id: '1',
    name: 'Frontend Development',
    color: '#3B82F6',
    category: 'Development',
    totalTime: 7200000,
    isRunning: false,
    lastStarted: 0,
  },
  {
    id: '2',
    name: 'UI Design',
    color: '#8B5CF6',
    category: 'Design',
    totalTime: 3600000,
    isRunning: false,
    lastStarted: 0,
  },
  {
    id: '3',
    name: 'Team Meeting',
    color: '#F59E0B',
    category: 'Meetings',
    totalTime: 1800000,
    isRunning: false,
    lastStarted: 0,
  },
  {
    id: '4',
    name: 'Code Review',
    color: '#10B981',
    category: 'Development',
    totalTime: 2700000,
    isRunning: false,
    lastStarted: 0,
  },
];