export interface GoalInterface {
  id: string;
  userId: string;
  taskId: string;
  targetHours: number;
  currentHours: number;
  period: string;
}