import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../common/enums';

export class RegisterDto {
  @ApiProperty({ example: 'jefe.providencia@coaniquem.cl' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: Role, example: Role.STORE_USER })
  @IsEnum(Role)
  role: Role;

  @ApiPropertyOptional({ description: 'ID de la tienda (requerido para store_user)', type: Number })
  @IsOptional()
  @IsInt() 
  storeId?: number;
}
