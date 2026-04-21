import { Task } from '../../tasks/entities/task.entity.js';
import { User } from '../../users/entities/user.entity.js';
export declare class Goal {
    id: string;
    user: User;
    userId: string;
    task: Task;
    taskId: string;
    targetHours: number;
    period: string;
}
