import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../services/users.service';
import { User as UserEntity } from '../user.entity';
import { UserDto } from '../dto/user.dto';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';

/**
 * Users Controller.
 */
@Controller('users')
@ApiTags('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * JWT is used to protect the route.
   * Only logged in users have access to this API.
   */
  @Get()
  @ApiOkResponse({ type: [UserDto] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('suggest')
  @ApiOkResponse({ type: [UserDto] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async suggest(
    @Query('login') login: string,
    @Query('limit') limit?: number
  ): Promise<UserEntity[]> {
    const users = await this.userService.getAutoSuggestUsers(login, limit);

    return users;
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: number): Promise<UserEntity> {
    const user = await this.userService.findOneById(id);

    // if the user doesn't exit in the db, throw a 404 error.
    if (!user) {
      throw new NotFoundException('This User does not exist');
    }

    return user;
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() user: UserDto): Promise<UserEntity> {
    return await this.userService.create(user);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body() user: UserDto
  ): Promise<UserDto> {
    const { numberOfAffectedRows, updatedUser } = await this.userService.update(
      id,
      user
    );

    // if the number of row affected is zero, it means the user doesn't exist in the db.
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This User does not exist');
    }

    return updatedUser;
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number) {
    const deleted = await this.userService.delete(id);

    // if the number of row affected is zero, then the user doesn't exist in the db.
    if (deleted === 0) {
      throw new NotFoundException('This User does not exist');
    }

    return 'Successfully deleted';
  }

  @Delete('soft-delete/:id')
  @ApiOkResponse({ type: UserEntity })
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async softDelete(@Param('id') id: number) {
    const deleted = await this.userService.softDelete(id);

    // if the number of row affected is zero, then the user doesn't exist in the db.
    if (deleted === 0) {
      throw new NotFoundException('This User does not exist');
    }

    return 'Successfully deleted';
  }
}
