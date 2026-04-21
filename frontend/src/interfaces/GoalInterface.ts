// Por Diego Chourio

export interface GoalInterface {
  id: string;
  userId: string;
  taskId: string;
  targetHours: number;
  period: 'monthly';
}