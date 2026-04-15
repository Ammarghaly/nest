import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async add(userId: number, productId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const isAlreadyInWishlist = user.wishlist.some((p) => p.id === productId);
    if (isAlreadyInWishlist) {
      throw new ConflictException('Product is already in your wishlist');
    }

    user.wishlist.push(product);
    return this.userRepository.save(user);
  }

  async findAll(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });
    return user.wishlist;
  }

  async remove(userId: number, productId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wishlist'],
    });

    user.wishlist = user.wishlist.filter((p) => p.id !== productId);
    return this.userRepository.save(user);
  }
}
