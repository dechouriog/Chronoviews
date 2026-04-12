import type { GoalInterface } from '@/interfaces/GoalInterface';

export const goalSeeder: GoalInterface[] = [
  { id: '1', userId: '1', taskId: '1', targetHours: 40, currentHours: 2, period: 'weekly' },
  { id: '2', userId: '1', taskId: '2', targetHours: 10, currentHours: 1, period: 'weekly' },
  { id: '3', userId: '1', taskId: '3', targetHours: 5, currentHours: 0.5, period: 'weekly' },
  { id: '4', userId: '1', taskId: '4', targetHours: 8, currentHours: 0.75, period: 'weekly' },
];