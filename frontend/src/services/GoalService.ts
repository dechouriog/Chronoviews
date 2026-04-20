// Por Diego Chourio

// External imports
import axios from 'axios';

// Internal imports
import type { CreateGoalDTO } from '@/dtos/CreateGoalDTO';
import type { GoalInterface } from '@/interfaces/GoalInterface';
import { TaskService } from '@/services/TaskService';

const API_URL = 'http://136.115.251.199:3000/api';

export class GoalService {
  static async getGoalsByUserId(userId: string): Promise<GoalInterface[]> {
    const { data } = await axios.get<GoalInterface[]>(`${API_URL}/user/${userId}`);
    return data;
  }

  static async createGoal(userId: string, goal: CreateGoalDTO): Promise<GoalInterface> {
    const { data } = await axios.post<GoalInterface>(API_URL, { userId, ...goal });
    return data;
  }

  static async deleteGoal(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }

  static async getProgress(goal: GoalInterface): Promise<number> {
    const task = await TaskService.getTaskById(goal.taskId);
    if (!task || goal.targetHours === 0) return 0;
    return Math.min((task.totalHours / goal.targetHours) * 100, 100);
  }

  static async hasGoalForTask(taskId: string, userId: string): Promise<boolean> {
    const goals = await GoalService.getGoalsByUserId(userId);
    return goals.some((goal: GoalInterface) => goal.taskId === taskId);
  }
}