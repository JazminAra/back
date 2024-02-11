import { Module } from '@nestjs/common';
import { DebtorTypeController } from './controllers/debtor-type.controller';
import { DebtorTypeService } from './services/debtor-type.service';
import { debtorTypeProvider } from './debtor-type.provider';

@Module({
  controllers: [DebtorTypeController],
  providers: [DebtorTypeService, ...debtorTypeProvider],
})
export class DebtorTypeModule {}
