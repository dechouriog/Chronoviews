import { User } from '../../users/entities/user.entity.js';
export declare class Task {
    id: string;
    user: User;
    userId: string;
    name: string;
    color: string;
    category: string;
    totalHours: number;
}
