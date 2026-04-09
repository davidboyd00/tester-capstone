import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ example: 'Tienda Providencia' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '1', description: 'ID de sucursal en BSale' })
  @IsOptional()
  @IsString()
  bsaleOfficeId?: string;

  @ApiPropertyOptional({ example: 'Av. Providencia 291' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Metropolitana' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({ example: 'Providencia' })
  @IsOptional()
  @IsString()
  city?: string;
}
