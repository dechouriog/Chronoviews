import { Column, Entity, ManyToOne, JoinColumn, RelationId, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../users/entities/user.entity.js';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @RelationId((task: Task) => task.user)
  userId: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  category: string;

  @Column({ type: 'float', default: 0 })
  totalHours: number;
}