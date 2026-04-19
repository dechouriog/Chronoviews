// Por Leidy Obando

export class CreateGoalDto {
  userId: string;
  taskId: string;
  targetHours: number;
  period?: string;
}