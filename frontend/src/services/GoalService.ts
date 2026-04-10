import { useGoalStore } from '@/stores/goalstore';
import type { GoalInterface } from '@/interfaces/GoalInterface';
import type { CreateGoalDTO } from '@/dtos/CreateGoalDTO';

export class GoalService {
  static getGoals(): GoalInterface[] {
    return useGoalStore().goals;
  }

  static getGoalByTaskId(taskId: string): GoalInterface | undefined {
    return useGoalStore().goals.find((goal: GoalInterface) => goal.taskId === taskId);
  }

  static createGoal(goal: CreateGoalDTO): void {
    const id = crypto.randomUUID();
    useGoalStore().goals.push({ id, ...goal });
  }

  static updateCurrentHours(taskId: string, hours: number): void {
    const goal = GoalService.getGoalByTaskId(taskId);
    if (!goal) return;
    goal.currentHours = hours;
  }

  static deleteGoal(id: string): void {
    const store = useGoalStore();
    store.goals = store.goals.filter((goal: GoalInterface) => goal.id !== id);
  }

  static checkProgress(taskId: string): number {
    const goal = GoalService.getGoalByTaskId(taskId);
    if (!goal || goal.targetHours === 0) return 0;
    return Math.min((goal.currentHours / goal.targetHours) * 100, 100);
  }
}