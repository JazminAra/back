import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrganTypeService } from '../services/organ-type.service';
import { OrganType } from '../organ-type.entity';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { PaginationDto } from '../../../core/dto';
import { CreateOrganTypeDto, UpdateOrganTypeDto } from '../dto';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('organ-type')
@ApiTags('organ-type')
@UseInterceptors(TransformInterceptor)
export class OrganTypeController {
  constructor(private readonly organTypeService: OrganTypeService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: OrganType })
  create(@Body() createOrganTypeDto: CreateOrganTypeDto) {
    return this.organTypeService.create(createOrganTypeDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [OrganType] })
  findAll(@Query() pagination: PaginationDto) {
    return this.organTypeService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: OrganType })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.organTypeService.findOne(id);
  }

  @Get('find-one-by/:name')
  @ApiOkResponse({ type: OrganType })
  findOneBy(@Param('name') name: string) {
    return this.organTypeService.findOneBy(name);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateOrganTypeDto: UpdateOrganTypeDto
  ) {
    return this.organTypeService.updateOne(id, updateOrganTypeDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  async softDelete(@Param('id', ParseIdPipe) id: number) {
    return await this.organTypeService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  async restore(@Param('id', ParseIdPipe) id: number) {
    return await this.organTypeService.restore(id);
  }
}
