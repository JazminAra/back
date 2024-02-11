import { Rol } from './rol.entity';
import { ROL_REPOSITORY } from '../../core/constants';

export const rolesProviders = [
  {
    provide: ROL_REPOSITORY,
    useValue: Rol,
  },
];
