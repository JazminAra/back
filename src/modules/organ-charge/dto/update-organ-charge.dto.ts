import { PartialType } from '@nestjs/swagger';
import { CreateOrganChargeDto } from './create-organ-charge.dto';

export class UpdateOrganChargeDto extends PartialType(CreateOrganChargeDto) {}
