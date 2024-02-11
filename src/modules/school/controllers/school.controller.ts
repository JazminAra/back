import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from '../../../core/dto';
import { CreateSchoolDto, UpdateSchoolDto } from '../dto';
import { SchoolService } from '../services/school.service';
import { School } from '../school.entity';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('school')
@ApiTags('school')
@UseInterceptors(TransformInterceptor)
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('create-one')
  @ApiOkResponse({ type: School })
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [School] })
  findAll(@Query() pagination?: PaginationDto) {
    return this.schoolService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: School })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.schoolService.findOne(id);
  }

  @Get('find-one-by/:name')
  @ApiOkResponse({ type: School })
  findOneBy(@Param('name') name: string) {
    return this.schoolService.findOneBy(name);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  update(@Param('id') id: number, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.updateOne(id, updateSchoolDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  softDelete(@Param('id', ParseIdPipe) id: number) {
    return this.schoolService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  restore(@Param('id', ParseIdPipe) id: number) {
    return this.schoolService.restore(id);
  }
}
