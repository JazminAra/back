import { IsNotEmpty, ArrayNotEmpty, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRolDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly aur_id: number;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  readonly userIds: number[];
}
