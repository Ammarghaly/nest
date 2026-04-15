import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { CouponsModule } from './coupons/coupons.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    TaskModule,
    CouponsModule,
    UsersModule,
    AddressesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
