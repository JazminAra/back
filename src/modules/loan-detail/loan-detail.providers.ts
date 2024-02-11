import { LOAN_DETAIL_REPOSITORY } from '../../core/constants/index';
import { LoanDetail } from './loan-detail.entity';

export const loanDetailProviders = [
  {
    provide: LOAN_DETAIL_REPOSITORY,
    useValue: LoanDetail,
  },
];
