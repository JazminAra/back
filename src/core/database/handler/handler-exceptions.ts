import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export const handlerExceptions = (dbError: any) => {
  switch (dbError.name) {
    case 'SequelizeValidationError':
      const errors: string[] = [];
      dbError.errors.forEach((error: any) => {
        errors.push(error.message);
      });
      throw new BadRequestException({
        message: 'Error tipo ValidationError',
        errors,
      });
    case 'SequelizeUniqueConstraintError':
      switch (dbError.parent.code) {
        case '23505':
          throw new BadRequestException(`${dbError.parent.detail}`);
        default:
          console.log(dbError);
          throw new BadRequestException('Error tipo UniqueConstraintError');
      }
    case 'SequelizeForeignKeyConstraintError':
      switch (dbError.parent.code) {
        case '23503':
          throw new BadRequestException(`${dbError.parent.detail}`);
        default:
          console.log(dbError);
          throw new BadRequestException('Error tipo ForeignKeyConstraintError');
      }
    default:
      console.log(dbError);
      throw new InternalServerErrorException(
        'Ha ocurrido un error, consulte con la consola'
      );
  }
};
