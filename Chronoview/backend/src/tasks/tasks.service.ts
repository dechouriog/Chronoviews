// Por Leidy Obando

// External imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { AddHoursDto } from './dto/add-hours.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { Task } from './entities/task.entity.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findByUserId(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  findOne(id: string): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { userId, ...rest } = createTaskDto;
    const task = this.tasksRepository.create({
      ...rest,
      user: { id: userId },
      totalHours: rest.totalHours ?? 0,
    });
    return this.tasksRepository.save(task);
  }

  async addHours(id: string, addHoursDto: AddHoursDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    task.totalHours += addHoursDto.hours;
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}