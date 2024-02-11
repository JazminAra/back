import { ORGAN_TYPE } from '../../core/constants/index';
import { OrganType } from './organ-type.entity';

export const organTypeProviders = [
  {
    provide: ORGAN_TYPE,
    useValue: OrganType,
  },
];
