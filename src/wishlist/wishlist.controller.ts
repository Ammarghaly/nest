import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('wishlist')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CUSTOMER)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  add(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req: any,
  ) {
    return this.wishlistService.add(req.user.id, productId);
  }

  @Get('me')
  findAll(@Req() req: any) {
    return this.wishlistService.findAll(req.user.id);
  }

  @Delete(':productId')
  remove(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req: any,
  ) {
    return this.wishlistService.remove(req.user.id, productId);
  }
}
