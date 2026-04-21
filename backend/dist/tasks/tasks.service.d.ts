import { Repository } from 'typeorm';
import { AddHoursDto } from './dto/add-hours.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { Task } from './entities/task.entity.js';
export declare class TasksService {
    private readonly tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    findAll(): Promise<Task[]>;
    findByUserId(userId: string): Promise<Task[]>;
    findOne(id: string): Promise<Task | null>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    addHours(id: string, addHoursDto: AddHoursDto): Promise<Task>;
    remove(id: string): Promise<void>;
}
