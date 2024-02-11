import { OBJECTS_REPOSITORY } from '../../core/constants/index';
import { Objects } from './objects.entity';

export const objectsProviders = [
  {
    provide: OBJECTS_REPOSITORY,
    useValue: Objects,
  },
];
