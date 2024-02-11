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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { DebtorService } from '../services/debtor.service';
import { Debtor } from '../debtor.entity';

import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { PaginationDto } from '../../../core/dto';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';

import { CreateDebtorDto, UpdateDebtorDto } from '../dto';

@Controller('debtor')
@ApiTags('debtor')
@UseInterceptors(TransformInterceptor)
export class DebtorController {
  constructor(private readonly debtorService: DebtorService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: Debtor })
  async create(@Body() createDebtorDto: CreateDebtorDto) {
    return await this.debtorService.create(createDebtorDto);
  }

  @Get('find-all')
  @ApiOkResponse({ type: [Debtor] })
  async findAll(@Query() pagination?: PaginationDto) {
    return await this.debtorService.findAll(pagination);
  }

  @Get('find-student/:docnum')
  @ApiOkResponse({ type: Object })
  findStudent(@Param('docnum') docNum: string) {
    return this.debtorService.findStudent(docNum);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: Debtor })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.debtorService.findOne(id);
  }

  @Get('find-one-by/:docnum')
  @ApiOkResponse({ type: Debtor })
  async findOneBy(@Param('docnum') docNum: string) {
    return await this.debtorService.findOneBy(docNum);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  @ApiParam({ name: 'id', type: Number, required: true })
  async update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateDebtorDto: UpdateDebtorDto
  ) {
    return await this.debtorService.updateOne(id, updateDebtorDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  async softDelete(@Param('id', ParseIdPipe) id: number) {
    return await this.debtorService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  async restore(@Param('id', ParseIdPipe) id: number) {
    return await this.debtorService.restore(id);
  }
}
