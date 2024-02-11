import { PartialType } from '@nestjs/swagger';
import { CreateObjectsTypeDto } from './create-objects-type.dto';

export class UpdateObjectsTypeDto extends PartialType(CreateObjectsTypeDto) {}
