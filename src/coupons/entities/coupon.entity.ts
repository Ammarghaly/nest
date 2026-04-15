import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column('int')
  discountPercent: number;

  @Column('timestamp')
  expiresAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
