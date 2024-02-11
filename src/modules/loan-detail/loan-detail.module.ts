import { Module } from '@nestjs/common';
import { LoanDetailService } from './services/loan-detail.service';
import { LoanDetailController } from './controllers/loan-detail.controller';
import { loanDetailProviders } from './loan-detail.providers';

@Module({
  controllers: [LoanDetailController],
  providers: [LoanDetailService, ...loanDetailProviders],
})
export class LoanDetailModule {}
