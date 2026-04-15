import { IsInt, Min, Max, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
