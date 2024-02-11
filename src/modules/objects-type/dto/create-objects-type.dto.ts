import { ApiBody, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateObjectsTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  tbie_nombre: string;
}
