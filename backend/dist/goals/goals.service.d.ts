import { Repository } from 'typeorm';
import { CreateGoalDto } from './dto/create-goal.dto.js';
import { Goal } from './entities/goal.entity.js';
export declare class GoalsService {
    private readonly goalsRepository;
    constructor(goalsRepository: Repository<Goal>);
    findAll(): Promise<Goal[]>;
    findByUserId(userId: string): Promise<Goal[]>;
    findOne(id: string): Promise<Goal | null>;
    create(createGoalDto: CreateGoalDto): Promise<Goal>;
    remove(id: string): Promise<void>;
}
