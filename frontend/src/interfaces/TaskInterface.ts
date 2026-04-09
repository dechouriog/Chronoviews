export interface TaskInterface {
  id: string;
  userId: string;
  name: string;
  color: string;
  category: string;
  totalTime: number;
  isRunning: boolean;
  lastStarted: number;
}