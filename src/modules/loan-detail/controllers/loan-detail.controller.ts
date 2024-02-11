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
import { LoanDetailService } from '../services/loan-detail.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoanDetail } from '../loan-detail.entity';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { CreateLoanDetailDto, UpdateLoanDetailDto, ParamsDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('loan-detail')
@ApiTags('loan-detail')
@UseInterceptors(TransformInterceptor)
export class LoanDetailController {
  constructor(private readonly loanDetailService: LoanDetailService) {}

  @Post('create-one')
  @ApiCreatedResponse({ type: LoanDetail })
  create(@Body() createLoanDetailDto: CreateLoanDetailDto) {
    return this.loanDetailService.create(createLoanDetailDto);
  }

  @Get('find-all-by')
  @ApiOkResponse({ type: [LoanDetail] })
  findAllBy(@Query() params: ParamsDto) {
    return this.loanDetailService.findAllBy(params);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: LoanDetail })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.loanDetailService.findOne(id);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateLoanDetailDto: UpdateLoanDetailDto
  ) {
    return this.loanDetailService.updateOne(id, updateLoanDetailDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  async softDelete(@Param('id', ParseIdPipe) id: number) {
    return await this.loanDetailService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  async restore(@Param('id', ParseIdPipe) id: number) {
    return await this.loanDetailService.restore(id);
  }
}
