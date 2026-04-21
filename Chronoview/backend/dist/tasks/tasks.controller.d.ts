import { AddHoursDto } from './dto/add-hours.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { Task } from './entities/task.entity.js';
import { TasksService } from './tasks.service.js';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): Promise<Task[]>;
    findByUserId(userId: string): Promise<Task[]>;
    findOne(id: string): Promise<Task | null>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    addHours(id: string, addHoursDto: AddHoursDto): Promise<Task>;
    remove(id: string): Promise<void>;
}
