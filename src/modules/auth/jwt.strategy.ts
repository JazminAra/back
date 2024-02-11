import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../users/services/users.service';

/**
 * This strategy will be used to protect protected resources.
 * Only authenticated users with a valid token will be able
 * to access these resources or endpoints.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      // Extract JWT from the Request.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Delegates the responsibility of ensuring that a
      // JWT has not expired to the Passport module.
      // This means that if our route is supplied with an expired JWT,
      // the request will be denied and a 401 Unauthorized response sent.
      // Passport conveniently handles this automatically for us.
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  /**
   * Passport first verifies the JWT’s signature and decodes the JSON.
   * It then invokes our validate() method passing the decoded JSON
   * as its single parameter.
   * Based on the way JWT signing works, we're guaranteed that
   * we're receiving a valid token that we have previously signed
   * and issued to a valid user.
   */
  async validate(payload: any) {
    // check if user in the token actually exist
    const user = await this.userService.findOneById(payload.usu_id);

    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation'
      );
    }

    return payload;
  }
}

/**
 * Reference: https://github.com/jaredhanson/passport
 */
