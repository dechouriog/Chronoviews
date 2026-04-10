import { useTaskStore } from '@/stores/taskstore';
import { useUserStore } from '@/stores/userstore';

import type { TaskInterface } from '@/interfaces/TaskInterface';
import type { CreateTaskDTO } from '@/dtos/CreateTaskDTO';

export class TaskService {
  private static getCurrentUserId(): string | null {
    return useUserStore().user?.id ?? null;
  }

  static getTasks(): TaskInterface[] {
    const userId = TaskService.getCurrentUserId();
    if (!userId) return [];
    return useTaskStore().tasks.filter((task: TaskInterface) => task.userId === userId);
  }

  static getTaskById(id: string): TaskInterface | undefined {
    return useTaskStore().tasks.find((task: TaskInterface) => task.id === id);
  }

  static createTask(task: CreateTaskDTO): void {
    const userId = TaskService.getCurrentUserId();
    if (!userId) return;
    const id = crypto.randomUUID();
    useTaskStore().tasks.push({ id, userId, ...task });
  }

  static deleteTask(id: string): void {
    const store = useTaskStore();
    store.tasks = store.tasks.filter((task: TaskInterface) => task.id !== id);
  }

  static startTask(id: string): void {
    const task = TaskService.getTaskById(id);
    if (!task || task.isRunning) return;
    task.isRunning = true;
    task.lastStarted = Date.now();
  }

  static stopTask(id: string): void {
    const task = TaskService.getTaskById(id);
    if (!task || !task.isRunning) return;
    task.isRunning = false;
    task.totalTime += Date.now() - task.lastStarted;
  }

  static toggleTask(id: string): void {
    const task = TaskService.getTaskById(id);
    if (!task) return;
    task.isRunning ? TaskService.stopTask(id) : TaskService.startTask(id);
  }

  static getUniqueCategories(): string[] {
    return Array.from(
      new Set(TaskService.getTasks().map((task: TaskInterface) => task.category)),
    );
  }
}