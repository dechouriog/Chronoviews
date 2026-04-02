export interface TaskInterface {
  id: string;
  name: string;
  color: string;
  category: string;
  totalTime: number;
  isRunning: boolean;
  lastStarted: number;
}
 