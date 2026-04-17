import { useGoalStore } from '@/stores/goalstore';
import { TaskService } from '@/services/TaskService';

import type { GoalInterface } from '@/interfaces/GoalInterface';
import type { CreateGoalDTO } from '@/dtos/CreateGoalDTO';

import { generateId } from '@/utils/generateId';

export class GoalService {
  static getGoalsByUserId(userId: string): GoalInterface[] {
    return useGoalStore().goals.filter((goal: GoalInterface) => goal.userId === userId);
  }

  static getGoalByTaskId(taskId: string): GoalInterface | undefined {
    return useGoalStore().goals.find((goal: GoalInterface) => goal.taskId === taskId);
  }

  static createGoal(userId: string, goal: CreateGoalDTO): void {
    const id = generateId();
    useGoalStore().goals.push({ id, userId, ...goal });
  }

  static deleteGoal(id: string): void {
    const store = useGoalStore();
    store.goals = store.goals.filter((goal: GoalInterface) => goal.id !== id);
  }

  static getProgress(goal: GoalInterface): number {
    const task = TaskService.getTaskById(goal.taskId);
    if (!task || goal.targetHours === 0) return 0;
    return Math.min((task.totalHours / goal.targetHours) * 100, 100);
  }

  static hasGoalForTask(taskId: string): boolean {
    return useGoalStore().goals.some((goal: GoalInterface) => goal.taskId === taskId);
  }
}