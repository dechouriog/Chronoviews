//Por Diego Chourio

// Internal imports
import type { CreateTaskDTO } from '@/dtos/CreateTaskDTO';
import type { TaskInterface } from '@/interfaces/TaskInterface';
import { useTaskStore } from '@/stores/taskstore';
import { generateId } from '@/utils/generateId';

export class TaskService {
  static getTasksByUserId(userId: string): TaskInterface[] {
    return useTaskStore().tasks.filter((task: TaskInterface) => task.userId === userId);
  }

  static getTaskById(id: string): TaskInterface | undefined {
    return useTaskStore().tasks.find((task: TaskInterface) => task.id === id);
  }

  static createTask(userId: string, task: CreateTaskDTO): void {
    const id = generateId();
    useTaskStore().tasks.push({ id, userId, ...task });
  }

  static addHours(id: string, hours: number): void {
    const task = TaskService.getTaskById(id);
    if (!task || hours <= 0) return;
    task.totalHours += hours;
  }

  static deleteTask(id: string): void {
    const store = useTaskStore();
    store.tasks = store.tasks.filter((task: TaskInterface) => task.id !== id);
  }

  static getUniqueCategoriesByUserId(userId: string): string[] {
    return Array.from(
      new Set(TaskService.getTasksByUserId(userId).map((task: TaskInterface) => task.category)),
    );
  }
}