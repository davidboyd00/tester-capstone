import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductsRackDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    rackid: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}