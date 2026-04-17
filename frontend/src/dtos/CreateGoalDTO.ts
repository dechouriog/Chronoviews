import type { GoalInterface } from '@/interfaces/GoalInterface';

export type CreateGoalDTO = Omit<GoalInterface, 'id' | 'userId'>;