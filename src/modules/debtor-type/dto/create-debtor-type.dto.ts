import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDebtorTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  tipo_deudor_nombre: string;
}
