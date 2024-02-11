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
import { ObjectsTypeService } from '../services/objects-type.service';
import { ObjectsType } from '../objects-type.entity';
import { PaginationDto } from '../../../core/dto';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { CreateObjectsTypeDto, UpdateObjectsTypeDto } from '../dto';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('objects-type')
@ApiTags('objects-type')
@UseInterceptors(TransformInterceptor)
export class ObjectsTypeController {
  constructor(private readonly objectsTypeService: ObjectsTypeService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: ObjectsType })
  create(@Body() createObjectsTypeDto: CreateObjectsTypeDto) {
    return this.objectsTypeService.create(createObjectsTypeDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [ObjectsType] })
  findAll(@Query() pagination?: PaginationDto) {
    return this.objectsTypeService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: ObjectsType })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.objectsTypeService.findOne(id);
  }

  @Get('find-one-by/:name')
  @ApiOkResponse({ type: [ObjectsType] })
  findOneBy(@Param('name') name: string) {
    return this.objectsTypeService.findOneBy(name);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  updateOne(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateObjectsTypeDto: UpdateObjectsTypeDto
  ) {
    return this.objectsTypeService.updateOne(id, updateObjectsTypeDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  softDelete(@Param('id', ParseIdPipe) id: number) {
    return this.objectsTypeService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  restore(@Param('id', ParseIdPipe) id: number) {
    return this.objectsTypeService.restore(id);
  }
}
