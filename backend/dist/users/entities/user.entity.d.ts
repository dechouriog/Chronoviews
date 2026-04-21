import { Goal } from '../../goals/entities/goal.entity.js';
import { Task } from '../../tasks/entities/task.entity.js';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    tasks: Task[];
    goals: Goal[];
}
