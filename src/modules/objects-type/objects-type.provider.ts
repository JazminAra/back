import { OBJECTS_TYPE_REPOSITORY } from '../../core/constants';
import { ObjectsType } from './objects-type.entity';

export const objectsTypesProviders = [
  {
    provide: OBJECTS_TYPE_REPOSITORY,
    useValue: ObjectsType,
  },
];
