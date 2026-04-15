import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../../auth/enums/role.enum';
import { Review } from '../../reviews/entities/review.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
  role: Role;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @ManyToMany(() => Product)
  @JoinTable()
  wishlist: Product[];
}
