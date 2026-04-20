// Por Diego Chourio

// External imports
import axios from 'axios';

// Internal imports
import type { CreateTaskDTO } from '@/dtos/CreateTaskDTO';
import type { TaskInterface } from '@/interfaces/TaskInterface';

const API_URL = 'http://136.115.251.199:3000/api';

export class TaskService {
  static async getTasksByUserId(userId: string): Promise<TaskInterface[]> {
    const { data } = await axios.get<TaskInterface[]>(`${API_URL}/user/${userId}`);
    return data;
  }

  static async getTaskById(id: string): Promise<TaskInterface | null> {
    const { data } = await axios.get<TaskInterface>(`${API_URL}/${id}`);
    return data;
  }

  static async createTask(userId: string, task: CreateTaskDTO): Promise<TaskInterface> {
    const { data } = await axios.post<TaskInterface>(API_URL, { userId, ...task });
    return data;
  }

  static async addHours(id: string, hours: number): Promise<TaskInterface> {
    const { data } = await axios.patch<TaskInterface>(`${API_URL}/${id}/hours`, { hours });
    return data;
  }

  static async deleteTask(id: string): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }

  static async getUniqueCategoriesByUserId(userId: string): Promise<string[]> {
    const tasks = await TaskService.getTasksByUserId(userId);
    return Array.from(new Set(tasks.map((task: TaskInterface) => task.category)));
  }
}