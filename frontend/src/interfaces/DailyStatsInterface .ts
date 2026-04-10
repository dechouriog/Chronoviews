import type { TaskBreakdownInterface } from './TaskBreakdownInterface';
 
export interface DailyStatsInterface {
  date: string;
  totalTime: number;
  taskBreakdown: TaskBreakdownInterface[];
}
 