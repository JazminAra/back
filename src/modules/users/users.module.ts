import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './controllers/users.controller';
import { EnvironmentConfigModule } from './../../core/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from './../../core/config/environment-config/environment-config.service';

@Module({
  providers: [UsersService, ...usersProviders, EnvironmentConfigService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [EnvironmentConfigModule],
})
export class UsersModule {}
