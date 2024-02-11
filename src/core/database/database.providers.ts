import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Rol } from '../../modules/roles/rol.entity';
import { UserRol } from '../../modules/user-roles/user-rol.entity';
import { Person } from '../../modules/person/person.entity';
import { Campus } from '../../modules/campus/campus.entity';
import { Faculty } from '../../modules/faculty/faculty.entity';
import { School } from '../../modules/school/school.entity';
import { DebtorType } from '../../modules/debtor-type/debtor-type.entity';
import { Organ } from '../../modules/organ/organ.entity';
import { OrganCharge } from '../../modules/organ-charge/organ-charge.entity';
import { Loan } from '../../modules/loan/loan.entity';
import { Debtor } from '../../modules/debtor/debtor.entity';
import { OrganType } from '../../modules/organ-type/organ-type.entity';
import { LoanDetail } from '../../modules/loan-detail/loan-detail.entity';
import { ObjectsType } from '../../modules/objects-type/objects-type.entity';
import { Objects } from '../../modules/objects/objects.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      config.define = {
        freezeTableName: true,
      };

      const sequelize = new Sequelize(config);

      sequelize.addModels([
        User,
        Rol,
        UserRol,
        Person,
        Campus,
        Faculty,
        School,
        DebtorType,
        Organ,
        OrganType,
        OrganCharge,
        Objects,
        ObjectsType,
        Loan,
        LoanDetail,
        Debtor,
      ]);
      // sequelize.addModels([__dirname + './../../modules/**/*.entity{.ts,.js}']);
      // await sequelize.sync();  //Desactivamos la sincronizacion de tablas

      return sequelize;
    },
  },
];

/**
 * Sequelize in NestJS: https://docs.nestjs.com/recipes/sql-sequelize
 * Sequelize Typescript: https://github.com/RobinBuschmann/sequelize-typescript
 * Migration: https://sequelize.org/master/manual/migrations.html
 */
