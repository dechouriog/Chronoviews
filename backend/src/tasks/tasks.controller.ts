import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { AddHoursDto } from './dto/add-hours.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { Task } from './entities/task.entity.js';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Task[]> {
    return this.tasksService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/hours')
  addHours(@Param('id') id: string, @Body() addHoursDto: AddHoursDto): Promise<Task> {
    return this.tasksService.addHours(id, addHoursDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}