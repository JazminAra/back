import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../core/dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class ParamsDto extends PaginationDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  id_prestamo: number;
}
