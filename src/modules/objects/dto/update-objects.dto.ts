import { PartialType } from '@nestjs/swagger';
import { CreateObjectsDto } from './create-objects.dto';

export class UpdateObjectsDto extends PartialType(CreateObjectsDto) {}
