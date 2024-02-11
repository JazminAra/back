import { Module } from '@nestjs/common';
import { OrganTypeService } from './services/organ-type.service';
import { OrganTypeController } from './controllers/organ-type.controller';
import { organTypeProviders } from './organ-type.provider';

@Module({
  controllers: [OrganTypeController],
  providers: [OrganTypeService, ...organTypeProviders],
})
export class OrganTypeModule {}
