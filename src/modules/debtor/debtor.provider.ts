import { DEBTOR_REPOSITORY } from '../../core/constants';
import { Debtor } from './debtor.entity';

export const debtorProvider = [
  {
    provide: DEBTOR_REPOSITORY,
    useValue: Debtor,
  },
];
