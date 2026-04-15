import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: User) {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      userId: user.id,
    });
    return this.reviewRepository.save(review);
  }

  async findByProductId(productId: number) {
    return this.reviewRepository.find({
      where: { productId },
      relations: ['user'],
    });
  }

  async remove(id: number, user: User) {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    if (review.userId !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    await this.reviewRepository.remove(review);
    return { message: 'Review deleted successfully' };
  }
}
