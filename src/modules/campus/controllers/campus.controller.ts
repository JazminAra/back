import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from '../../../core/dto';
import { CreateCampusDto, UpdateCampusDto } from '../dto';
import { CampusService } from '../services/campus.service';
import { Campus } from '../campus.entity';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('campus')
@ApiTags('campus')
@UseInterceptors(TransformInterceptor)
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: Campus })
  create(@Body() createCampusDto: CreateCampusDto) {
    return this.campusService.create(createCampusDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [Campus] })
  findAll(@Query() pagination: PaginationDto) {
    return this.campusService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: Campus })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.campusService.findOne(id);
  }

  @Get('find-one-by/:name')
  @ApiOkResponse({ type: Campus })
  findOneBy(@Param('name') name: string) {
    return this.campusService.findOneBy(name);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateCampusDto: UpdateCampusDto
  ) {
    return this.campusService.updateOne(id, updateCampusDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  softDelete(@Param('id', ParseIdPipe) id: number) {
    return this.campusService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  restore(@Param('id', ParseIdPipe) id: number) {
    return this.campusService.restore(id);
  }
}
