import { CreateCampusDto } from './create-campus.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCampusDto extends PartialType(CreateCampusDto) {}
