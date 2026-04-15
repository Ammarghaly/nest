import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../../auth/enums/role.enum';
import { Review } from '../../reviews/entities/review.entity';

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
}
