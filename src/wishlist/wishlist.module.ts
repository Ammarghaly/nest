import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [WishlistController],
  providers: [WishlistService],
})
export class WishlistModule {}
