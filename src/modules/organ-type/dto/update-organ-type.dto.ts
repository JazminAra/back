import { PartialType } from '@nestjs/swagger';
import { CreateOrganTypeDto } from './create-organ-type.dto';

export class UpdateOrganTypeDto extends PartialType(CreateOrganTypeDto) {}
