import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
<<<<<<< HEAD
import { Review } from './entities/review.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Review])],
  controllers: [BooksController, ReviewsController],
  providers: [BooksService, ReviewsService],
=======

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
>>>>>>> 53e9146d0e9edf35081b231c1dfd83629b09dd30
})
export class BooksModule {}
