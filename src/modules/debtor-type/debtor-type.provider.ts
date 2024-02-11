import { DEBTOR_TYPE } from '../../core/constants';
import { DebtorType } from './debtor-type.entity';

export const debtorTypeProvider = [
  {
    provide: DEBTOR_TYPE,
    useValue: DebtorType,
  },
];
