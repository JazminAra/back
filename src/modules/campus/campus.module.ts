import { Module } from '@nestjs/common';
import { CampusController } from './controllers/campus.controller';
import { CampusService } from './services/campus.service';
import { campusProvider } from './campus.provider';

@Module({
  controllers: [CampusController],
  providers: [CampusService, ...campusProvider],
})
export class CampusModule {}
