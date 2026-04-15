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

  @ApiProperty({ example: 'Providencia' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ example: 'Metropolitana' })
  @IsOptional()
  @IsString()
  municipality?: string;

  @ApiPropertyOptional({ example: 'Av. Providencia 291' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;
  
  @ApiProperty({ example: 'L-V'})
  @IsString()
  attentionType: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cluster: string;
}
