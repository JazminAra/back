import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnvironmentConfigModule } from './core/config/environment-config/environment-config.module';
import { RolesModule } from './modules/roles/roles.module';
import { CampusModule } from './modules/campus/campus.module';
import { FacultyModule } from './modules/faculty/faculty.module';
import { SchoolModule } from './modules/school/school.module';
import { OrganModule } from './modules/organ/organ.module';
import { DebtorTypeModule } from './modules/debtor-type/debtor-type.module';
import { DebtorModule } from './modules/debtor/debtor.module';
import { OrganChargeModule } from './modules/organ-charge/organ-charge.module';
import { LoanModule } from './modules/loan/loan.module';
import { LoanDetailModule } from './modules/loan-detail/loan-detail.module';
import { OrganTypeModule } from './modules/organ-type/organ-type.module';
import { ObjectsModule } from './modules/objects/objects.module';
import { ObjectsTypeModule } from './modules/objects-type/objects-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    EnvironmentConfigModule,
    RolesModule,
    CampusModule,
    FacultyModule,
    SchoolModule,
    OrganModule,
    OrganTypeModule,
    OrganChargeModule,
    ObjectsModule,
    ObjectsTypeModule,
    DebtorModule,
    DebtorTypeModule,
    LoanModule,
    LoanDetailModule,
  ],
})
export class AppModule {}
