import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';

@Controller('coupons')
export class CouponsController {
  private coupons: any[] = [];

  @Post()
  create(@Body() data: any) {
    for (const coupon of this.coupons) {
      if (coupon.code === data.code) {
        throw new BadRequestException('Code already exists');
      }
    }

    if (data.discountPercent < 1 || data.discountPercent > 90) {
      throw new BadRequestException('Discount must be between 1 and 90');
    }

    const newCoupon = {
      id: this.coupons.length + 1,
      code: data.code,
      discountPercent: data.discountPercent,
      isActive: true
    };

    this.coupons.push(newCoupon);
    return newCoupon;
  }

  @Get()
  findAll() {
    return this.coupons;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    const index = this.coupons.findIndex(c => c.id === +id);
    if (index === -1) throw new BadRequestException('Coupon not found');

    this.coupons[index] = { ...this.coupons[index], ...data };
    return this.coupons[index];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const index = this.coupons.findIndex(c => c.id === +id);
    if (index === -1) throw new BadRequestException('Coupon not found');

    const deleted = this.coupons[index];
    this.coupons.splice(index, 1);
    return deleted;
  }
}
