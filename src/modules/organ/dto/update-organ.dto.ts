import { PartialType } from '@nestjs/swagger';
import { CreateOrganDto } from './create-organ.dto';

export class UpdateOrganDto extends PartialType(CreateOrganDto) {}
