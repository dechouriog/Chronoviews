import type { GoalInterface } from '@/interfaces/GoalInterface';

export const goalSeeder: GoalInterface[] = [
  { id: '1', userId: '1', taskId: '1', targetHours: 40,period: 'monthly' },
  { id: '2', userId: '1', taskId: '2', targetHours: 10,period: 'monthly' },
  { id: '3', userId: '1', taskId: '3', targetHours: 5, period: 'monthly' },
  { id: '4', userId: '1', taskId: '4', targetHours: 8, period: 'monthly' },
];