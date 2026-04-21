// Por Diego Chourio

// Internal
import type { TaskInterface } from '@/interfaces/TaskInterface';

export type CreateTaskDTO = Omit<TaskInterface, 'id' | 'userId'>;