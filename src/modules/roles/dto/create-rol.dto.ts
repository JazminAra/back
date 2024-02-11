import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsString,
  IsAlphanumeric,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly apr_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  readonly apr_nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  // @MinLength(6)
  readonly apr_descripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly apr_estado: boolean;

  @ApiProperty()
  // @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly app_id: number;
}
