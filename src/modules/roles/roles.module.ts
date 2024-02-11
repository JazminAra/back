import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { rolesProviders } from './roles.providers';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [RolesService, ...rolesProviders],
  controllers: [RolesController],
})
export class RolesModule {}
