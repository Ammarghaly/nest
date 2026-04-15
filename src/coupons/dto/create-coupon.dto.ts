import { IsString, IsInt, Min, Max, IsDateString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsInt()
  @Min(1)
  @Max(90)
  discountPercent: number;

  @IsDateString()
  expiresAt: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
