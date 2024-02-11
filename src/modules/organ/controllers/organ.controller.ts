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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../../core/dto';
import { CreateOrganDto, UpdateOrganDto } from '../dto';
import { OrganService } from '../services/organ.service';
import { Organ } from '../organ.entity';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('organ')
@ApiTags('organ')
@UseInterceptors(TransformInterceptor)
export class OrganController {
  constructor(private readonly organService: OrganService) {}

  @Post('create-one')
  @ApiOkResponse({ type: Organ })
  create(@Body() createOrganDto: CreateOrganDto) {
    return this.organService.create(createOrganDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [Organ] })
  findAll(@Query() pagination?: PaginationDto) {
    return this.organService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: Organ })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.organService.findOne(id);
  }

  @Get('find-one-by/:name')
  @ApiOkResponse({ type: Organ })
  findOneBy(@Param('name') name: string) {
    return this.organService.findOneBy(name);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  updateOne(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateOrganDto: UpdateOrganDto
  ) {
    return this.organService.updateOne(id, updateOrganDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  async softDelete(@Param('id', ParseIdPipe) id: number) {
    return await this.organService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  async restore(@Param('id', ParseIdPipe) id: number) {
    return await this.organService.restore(id);
  }
}
