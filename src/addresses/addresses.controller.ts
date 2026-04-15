import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';

@Controller('addresses')
export class AddressesController {
  private addresses: any[] = [];

  @Post()
  create(@Body() data: any) {
    const newAddress = {
      id: this.addresses.length + 1,
      userId: 1,
      city: data.city,
      street: data.street,
      isDefault: data.isDefault || false
    };

    if (newAddress.isDefault === true) {
      for (let i = 0; i < this.addresses.length; i++) {
        this.addresses[i].isDefault = false;
      }
    }

    this.addresses.push(newAddress);
    return newAddress;
  }

  @Get('me')
  findAll() {
    return this.addresses;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    const index = this.addresses.findIndex(a => a.id === +id);
    if (index === -1) throw new BadRequestException('Address not found');

    if (data.isDefault === true) {
      for (let i = 0; i < this.addresses.length; i++) {
        this.addresses[i].isDefault = false;
      }
    }

    this.addresses[index] = { ...this.addresses[index], ...data };
    return this.addresses[index];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const index = this.addresses.findIndex(a => a.id === +id);
    if (index === -1) throw new BadRequestException('Address not found');
    
    const deleted = this.addresses[index];
    this.addresses.splice(index, 1);
    return deleted;
  }
}
