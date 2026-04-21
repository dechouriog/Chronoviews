// Por Leidy Obando

export class CreateTaskDto {
  userId: string;
  name: string;
  color: string;
  category: string;
  totalHours?: number;
}