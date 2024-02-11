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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from '../../../core/dto';
import { CreateOrganChargeDto, UpdateOrganChargeDto } from '../dto';
import { OrganChargeService } from '../services/organ-charge.service';
import { OrganCharge } from '../organ-charge.entity';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('organ-charge')
@ApiTags('organ-charge')
@UseInterceptors(TransformInterceptor)
export class OrganChargeController {
  constructor(private readonly organChargeService: OrganChargeService) {}
  @Post('create-one')
  @ApiOkResponse({ type: OrganCharge })
  create(@Body() createOrganChargeDto: CreateOrganChargeDto) {
    return this.organChargeService.create(createOrganChargeDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [OrganCharge] })
  findAll(@Query() pagination?: PaginationDto) {
    return this.organChargeService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: OrganCharge })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.organChargeService.findOne(id);
  }

  @Get('find-one-by/:name')
  @ApiOkResponse({ type: [OrganCharge] })
  findOneBy(@Param('name') name: string) {
    return this.organChargeService.findOneBy(name);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  updateOne(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateOrganChargeDto: UpdateOrganChargeDto
  ) {
    return this.organChargeService.updateOne(id, updateOrganChargeDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  softDelete(@Param('id', ParseIdPipe) id: number) {
    return this.organChargeService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  restore(@Param('id', ParseIdPipe) id: number) {
    return this.organChargeService.restore(id);
  }
}
