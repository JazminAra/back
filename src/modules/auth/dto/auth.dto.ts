import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class AuthDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly user: UserDto;

  @ApiProperty()
  @IsNotEmpty()
  readonly token: string;
}
