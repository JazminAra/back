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
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLoanDto, UpdateLoanDto } from '../dto';
import { LoanService } from '../services/loan.service';
import { Loan } from '../loan.entity';
import { ParseIdPipe } from '../../../core/pipes/parse-id.pipe';
import { TransformInterceptor } from '../../../core/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';

@Controller('loan')
@ApiTags('loan')
@UseInterceptors(TransformInterceptor)
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('create-one')
  @ApiOkResponse({ type: Loan })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @Get('find-all-by')
  @ApiOkResponse({ type: [Loan] })
  findAllBy(@Param('docnum') docNum: string) {
    return this.loanService.findAllBy(docNum);
  }

  @Get('find-one/:id')
  @ApiOkResponse({ type: Loan })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.loanService.findOne(id);
  }

  @Patch('update-one/:id')
  @ApiOkResponse({ type: Boolean })
  async update(
    @Param('id', ParseIdPipe) id: number,
    @Body() updateLoanDto: UpdateLoanDto
  ) {
    return await this.loanService.updateOne(id, updateLoanDto);
  }

  @Patch('soft-delete/:id')
  @ApiOkResponse({ type: Boolean })
  async softDelete(@Param('id', ParseIdPipe) id: number) {
    return await this.loanService.softDelete(id);
  }

  @Patch('restore/:id')
  @ApiOkResponse({ type: Boolean })
  async restore(@Param('id', ParseIdPipe) id: number) {
    return await this.loanService.restore(id);
  }
}
