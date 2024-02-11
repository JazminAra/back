import { Module } from '@nestjs/common';
import { DebtorController } from './controllers/debtor.controller';
import { DebtorService } from './services/debtor.service';
import { debtorProvider } from './debtor.provider';

@Module({
  controllers: [DebtorController],
  providers: [DebtorService, ...debtorProvider],
  exports: [DebtorService],
})
export class DebtorModule {}
