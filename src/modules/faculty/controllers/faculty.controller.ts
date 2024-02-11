import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateFacultyDto, UpdateFacultyDto } from '../dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Faculty } from '../faculty.entity';
import { FacultyService } from '../services/faculty.service';
import { PaginationDto } from '../../../core/dto';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('faculty')
@ApiTags('faculty')
@UseInterceptors(TransformInterceptor)
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: Faculty })
  create(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultyService.create(createFacultyDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [Faculty] })
  finAll(@Query() pagination: PaginationDto) {
    return this.facultyService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: Faculty })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.facultyService.findOne(id);
  }

  @Get('find-one-by/:name')
  @ApiOkResponse({ type: Faculty })
  findOneBy(@Param('name') name: string) {
    return this.facultyService.findOneBy(name);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateFacultyDto: UpdateFacultyDto
  ) {
    return this.facultyService.updateOne(id, updateFacultyDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  softDelete(@Param('id', ParseIdPipe) id: number) {
    return this.facultyService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  restore(@Param('id', ParseIdPipe) id: number) {
    return this.facultyService.restore(id);
  }
}
