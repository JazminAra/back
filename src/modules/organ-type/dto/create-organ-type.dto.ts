import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateOrganTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  tor_nombre: string;
}
