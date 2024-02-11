import { Module } from '@nestjs/common';
import { ObjectsService } from './services/objects.service';
import { ObjectsController } from './controllers/objects.controller';
import { objectsProviders } from './objects.provider';

@Module({
  controllers: [ObjectsController],
  providers: [ObjectsService, ...objectsProviders],
})
export class ObjectsModule {}
