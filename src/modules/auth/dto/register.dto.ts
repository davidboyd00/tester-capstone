import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../common/enums';

export class RegisterDto {
  @ApiProperty({ example: 'jefe.providencia@coaniquem.cl' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Juan Perez' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Role, example: Role.EDITOR })
  @IsEnum(Role)
  role: Role;

  @ApiPropertyOptional({ description: 'ID de la tienda (requerido para editor/viewer)' })
  @IsOptional()
  @IsUUID()
  storeId?: string;
}
