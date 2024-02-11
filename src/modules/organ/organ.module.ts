import { Module } from '@nestjs/common';
import { OrganController } from './controllers/organ.controller';
import { OrganService } from './services/organ.service';
import { organProvider } from './organ.provider';

@Module({
  controllers: [OrganController],
  providers: [OrganService, ...organProvider],
})
export class OrganModule {}
