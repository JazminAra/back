import { Module } from '@nestjs/common';
import { ObjectsTypeService } from './services/objects-type.service';
import { ObjectsTypeController } from './controllers/objects-type.controller';
import { objectsTypesProviders } from './objects-type.provider';

@Module({
  controllers: [ObjectsTypeController],
  providers: [ObjectsTypeService, ...objectsTypesProviders],
})
export class ObjectsTypeModule {}
