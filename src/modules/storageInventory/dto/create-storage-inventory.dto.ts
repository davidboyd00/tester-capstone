import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStorageInventoryDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    storeId: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    numSack: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    openSack: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    colourSack: string;
}