import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateOrganChargeDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  id_organo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  oca_nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  oca_cargo_nivel: string;
}
