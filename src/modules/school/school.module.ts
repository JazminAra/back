import { Module } from '@nestjs/common';
import { SchoolController } from './controllers/school.controller';
import { SchoolService } from './services/school.service';
import { schoolProviders } from './school.provider';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService, ...schoolProviders],
})
export class SchoolModule {}
