import { CreateGoalDto } from './dto/create-goal.dto.js';
import { Goal } from './entities/goal.entity.js';
import { GoalsService } from './goals.service.js';
export declare class GoalsController {
    private readonly goalsService;
    constructor(goalsService: GoalsService);
    findAll(): Promise<Goal[]>;
    findByUserId(userId: string): Promise<Goal[]>;
    findOne(id: string): Promise<Goal | null>;
    create(createGoalDto: CreateGoalDto): Promise<Goal>;
    remove(id: string): Promise<void>;
}
