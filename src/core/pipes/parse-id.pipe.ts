import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isInt, isPositive } from 'class-validator';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value = Number(value) as number;
    if (isInt(value) && isPositive(value)) return value;
    else throw new BadRequestException(`Id no permitido`);
  }
}
