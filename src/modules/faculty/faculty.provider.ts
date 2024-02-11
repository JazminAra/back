import { Faculty } from './faculty.entity';
import { FACULTY_REPOSITORY } from '../../core/constants';
export const facultyProviders = [
  {
    provide: FACULTY_REPOSITORY,
    useValue: Faculty,
  },
];
