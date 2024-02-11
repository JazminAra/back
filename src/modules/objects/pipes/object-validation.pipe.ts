import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseObjectPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value.length >= 1 && value.length <= 20) {
      value = value.replace('-', '/');
      return value.trim();
    } else throw new BadRequestException('Ingrese un codigo valido');
  }
}
