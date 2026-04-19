import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateGoalDto } from './dto/create-goal.dto.js';
import { Goal } from './entities/goal.entity.js';
import { GoalsService } from './goals.service.js';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Get()
  findAll(): Promise<Goal[]> {
    return this.goalsService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Goal[]> {
    return this.goalsService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Goal | null> {
    return this.goalsService.findOne(id);
  }

  @Post()
  create(@Body() createGoalDto: CreateGoalDto): Promise<Goal> {
    return this.goalsService.create(createGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.goalsService.remove(id);
  }
}