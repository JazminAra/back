import { ORGAN_REPOSITORY } from '../../core/constants';
import { Organ } from './organ.entity';

export const organProvider = [
  {
    provide: ORGAN_REPOSITORY,
    useValue: Organ,
  },
];
