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
import { CreateDebtorTypeDto, UpdateDebtorTypeDto } from '../dto';
import { DebtorTypeService } from '../services/debtor-type.service';
import { DebtorType } from '../debtor-type.entity';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('debtor-type')
@ApiTags('debtor-type')
@UseInterceptors(TransformInterceptor)
export class DebtorTypeController {
  constructor(private readonly debtorTypeService: DebtorTypeService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: DebtorType })
  create(@Body() createDebtorTypeDto: CreateDebtorTypeDto) {
    return this.debtorTypeService.create(createDebtorTypeDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [DebtorType] })
  findAll(@Query() pagination?: PaginationDto) {
    return this.debtorTypeService.findAll(pagination);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: DebtorType })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.debtorTypeService.findOne(id);
  }

  @Get('find-one-by/:name')
  @ApiOkResponse({ type: DebtorType })
  findOneBy(@Param('name') name: string) {
    return this.debtorTypeService.findOneBy(name);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateCampusDto: UpdateDebtorTypeDto
  ) {
    return this.debtorTypeService.updateOne(id, updateCampusDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  softDelete(@Param('id', ParseIdPipe) id: number) {
    return this.debtorTypeService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  restore(@Param('id', ParseIdPipe) id: number) {
    return this.debtorTypeService.restore(id);
  }
}
