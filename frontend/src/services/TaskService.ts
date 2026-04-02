import { useTaskStore } from '@/stores/taskstore';
import type { TaskInterface } from '@/interfaces/TaskInterface';
import type { CreateTaskDTO } from '@/dtos/CreateTaskDTO';

export class TaskService {
  static getTasks(): TaskInterface[] {
    return useTaskStore().tasks;
  }

  static getTaskById(id: string): TaskInterface | undefined {
    return useTaskStore().tasks.find((task: TaskInterface) => task.id === id);
  }

  static createTask(task: CreateTaskDTO): void {
    const id = crypto.randomUUID();
    useTaskStore().tasks.push({ id, ...task });
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
    const categories = useTaskStore().tasks.map((task: TaskInterface) => task.category);
    return Array.from(new Set(categories));
  }
}