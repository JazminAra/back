import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '../../modules/users/services/users.service';

/**
 * Prevents users from signing up with the same email twice
 * since email is unique at the schema level.
 */
@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.userService.findOneByLogin(request.body.login);

    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }

    return true;
  }
}
