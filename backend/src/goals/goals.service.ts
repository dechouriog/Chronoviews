// Por Leidy Obando

// External imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { CreateGoalDto } from './dto/create-goal.dto.js';
import { Goal } from './entities/goal.entity.js';

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalsRepository: Repository<Goal>,
  ) {}

  findAll(): Promise<Goal[]> {
    return this.goalsRepository.find();
  }

  findByUserId(userId: string): Promise<Goal[]> {
    return this.goalsRepository.find({ where: { user: { id: userId } } });
  }

  findOne(id: string): Promise<Goal | null> {
    return this.goalsRepository.findOneBy({ id });
  }

  create(createGoalDto: CreateGoalDto): Promise<Goal> {
    const { userId, taskId, ...rest } = createGoalDto;
    const goal = this.goalsRepository.create({
      ...rest,
      user: { id: userId },
      task: { id: taskId },
      period: rest.period ?? 'monthly',
    });
    return this.goalsRepository.save(goal);
  }

  async remove(id: string): Promise<void> {
    await this.goalsRepository.delete(id);
  }
}