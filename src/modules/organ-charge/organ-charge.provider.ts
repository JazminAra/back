import { ORGAN_CHARGE_REPOSITORY } from '../../core/constants';
import { OrganCharge } from './organ-charge.entity';

export const organChargeProvider = [
  {
    provide: ORGAN_CHARGE_REPOSITORY,
    useValue: OrganCharge,
  },
];
