import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Objects } from '../objects.entity';
import { ObjectsService } from '../services/objects.service';
import { CreateObjectsDto, UpdateObjectsDto } from '../dto';
import { PaginationDto } from '../../../core/dto';
import { ParseObjectPipe } from '../pipes/object-validation.pipe';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('objects')
@ApiTags('objects')
@UseInterceptors(TransformInterceptor)
export class ObjectsController {
  constructor(private readonly objectService: ObjectsService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: Objects })
  create(@Body() createObjectDto: CreateObjectsDto) {
    return this.objectService.create(createObjectDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [Objects] })
  findAll(@Query() pagination?: PaginationDto) {
    return this.objectService.findAll(pagination);
  }

  @Get('find-all-by/:cod')
  @ApiOkResponse({ type: [Objects] })
  findAllBy(
    @Param('cod', ParseObjectPipe) cod: string,
    @Query() pagination?: PaginationDto
  ) {
    return this.objectService.findAllBy(cod, pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: Objects })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.objectService.findOne(id);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateObjectDto: UpdateObjectsDto
  ) {
    return this.objectService.updateOne(id, updateObjectDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  softDelete(@Param('id', ParseIdPipe) id: number) {
    return this.objectService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  restore(@Param('id', ParseIdPipe) id: number) {
    return this.objectService.restore(id);
  }
}
