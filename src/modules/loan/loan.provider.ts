import { LOAN_REPOSITORY } from '../../core/constants';
import { Loan } from './loan.entity';

export const loanProvider = [
  {
    provide: LOAN_REPOSITORY,
    useValue: Loan,
  },
];
