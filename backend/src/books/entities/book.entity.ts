<<<<<<< HEAD
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';
=======
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
>>>>>>> 53e9146d0e9edf35081b231c1dfd83629b09dd30

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  stock: number;
<<<<<<< HEAD

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
=======
>>>>>>> 53e9146d0e9edf35081b231c1dfd83629b09dd30
}
