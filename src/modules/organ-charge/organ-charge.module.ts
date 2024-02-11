import { Module } from '@nestjs/common';
import { OrganChargeController } from './controllers/organ-charge.controller';
import { OrganChargeService } from './services/organ-charge.service';
import { organChargeProvider } from './organ-charge.provider';

@Module({
  controllers: [OrganChargeController],
  providers: [OrganChargeService, ...organChargeProvider],
})
export class OrganChargeModule {}
