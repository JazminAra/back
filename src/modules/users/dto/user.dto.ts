import {
  IsNotEmpty,
  MinLength,
  Min,
  Max,
  IsInt,
  IsBoolean,
  IsString,
  IsAlphanumeric,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly usu_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly per_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  readonly usu_login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly usu_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly usu_estado: boolean;
}
