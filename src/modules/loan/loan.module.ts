import { Module } from '@nestjs/common';
import { LoanController } from './controllers/loan.controller';
import { LoanService } from './services/loan.service';
import { loanProvider } from './loan.provider';
import { debtorProvider } from '../debtor/debtor.provider';
import { DebtorModule } from '../debtor/debtor.module';

@Module({
  controllers: [LoanController],
  providers: [LoanService, ...loanProvider, ...debtorProvider],
  imports: [DebtorModule],
})
export class LoanModule {}
