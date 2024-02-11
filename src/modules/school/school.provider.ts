import { SCHOOL_REPOSITORY } from '../../core/constants';
import { School } from './school.entity';

export const schoolProviders = [
  {
    provide: SCHOOL_REPOSITORY,
    useValue: School,
  },
];
