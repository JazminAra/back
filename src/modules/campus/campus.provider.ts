import { Campus } from './campus.entity';
import { CAMPUS_TYPE } from '../../core/constants';

export const campusProvider = [
  {
    provide: CAMPUS_TYPE,
    useValue: Campus,
  },
];
