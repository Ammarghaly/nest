import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @ManyToMany(() => User, (user) => user.wishlist)
  wishlist: User[];
}
