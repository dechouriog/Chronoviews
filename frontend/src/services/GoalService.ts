// Por Diego Chourio

// External imports
import axios from 'axios';

// Internal imports
import type { CreateGoalDTO } from '@/dtos/CreateGoalDTO';
import type { GoalInterface } from '@/interfaces/GoalInterface';
import type { TaskInterface } from '@/interfaces/TaskInterface';

const API_URL = import.meta.env.VITE_API_URL as string;

export class GoalService {
  static async getGoalsByUserId(userId: string): Promise<GoalInterface[]> {
    const { data } = await axios.get<GoalInterface[]>(`${API_URL}/goals/user/${userId}`);
    return data;
  }

  static async createGoal(userId: string, goal: CreateGoalDTO): Promise<GoalInterface> {
    const { data } = await axios.post<GoalInterface>(`${API_URL}/goals`, { userId, ...goal });
    return data;
  }

  static async deleteGoal(id: string): Promise<void> {
    await axios.delete(`${API_URL}/goals/${id}`);
  }

  static getProgress(goal: GoalInterface, task: TaskInterface): number {
    if (goal.targetHours === 0) return 0;
    return Math.min((task.totalHours / goal.targetHours) * 100, 100);
  }

  static async hasGoalForTask(taskId: string, userId: string): Promise<boolean> {
    const goals = await GoalService.getGoalsByUserId(userId);
    return goals.some((goal: GoalInterface) => goal.taskId === taskId);
  }
}
