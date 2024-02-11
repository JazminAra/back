import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable() // чтобы можно было внедрять
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );

      if (!requiredRoles) {
        // si los roles no están restringidos de ninguna manera, devuelve true - permite el acceso
        return true;
      }

      const req = context.switchToHttp().getRequest(); // get the request object (as in express)
      const authHeader = req.headers.authorization; // from request headers get authorization (must contain token)
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User not authorized' });
      }
      // we have a Bearer token. Let's decode it
      const user = this.jwtService.verify(token);
      console.log(user.roles);
      req.user = user; // в объект req добавляем поле user, чтобы открыть доступ к эндпоинтам
      const isCorrectRole = user.roles.some(role =>
        requiredRoles.includes(role.apr_nombre)
      ); // Verificamos si el nombre del rol permitido lo tiene el usuario en su token, en el caso de rol-entity es apr_nombre

      const requestingUserID = Number(req.params.id);
      const currentUserID = user.id;

      // if our role is not among the required roles, then check for matching id (you can change and delete yourself).
      if (!isCorrectRole && currentUserID !== requestingUserID) {
        return false;
      }

      return true;
    } catch (error) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
