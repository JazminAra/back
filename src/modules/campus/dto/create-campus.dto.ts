import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCampusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  sed_nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  sed_ubigeo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  sed_sga_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  sed_suv_id?: number;
}
