import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  UseGuards,
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

import { RolesService } from './../services/roles.service';
import { Rol } from './../rol.entity';
import { CreateRolDto } from '../dto/create-rol.dto';
import { UserRolDto } from '../../user-roles/dto/user-rol.dto';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { PaginationDto } from '../../../core/dto';
import { UpdateRolDto } from '../dto/update-rol.dto';

@Controller('roles')
@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(TransformInterceptor)
export class RolesController {
  constructor(private readonly rolService: RolesService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: Rol })
  create(@Body() user: CreateRolDto) {
    return this.rolService.create(user);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [Rol] })
  findAll(@Query() pagination?: PaginationDto) {
    return this.rolService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: Rol })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.rolService.findOne(id);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Rol })
  updateOne(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateRolDto: UpdateRolDto
  ) {
    return this.rolService.updateOne(id, updateRolDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Rol })
  @ApiParam({ name: 'id', required: true })
  deleteOne(@Param('id') id: number) {
    return this.rolService.deleteOne(id);
  }

  @Post('add-users')
  @ApiCreatedResponse({ type: Rol })
  addUsersToGroup(@Body() userGroups: UserRolDto) {
    const added = this.rolService.addUsersToGroup(userGroups);

    // if the number of row affected is zero, then the group doesn't exist in the db.
    if (added) {
      throw new NotFoundException('Ether the rol or user does not exist');
    }

    return 'Successfully added';
  }
}
