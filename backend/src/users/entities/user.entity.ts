// Por Leidy Obando

// External imports
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Internal imports
import { Goal } from '../../goals/entities/goal.entity.js';
import { Task } from '../../tasks/entities/task.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];
}