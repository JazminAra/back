import { PartialType } from '@nestjs/swagger';
import { CreateDebtorTypeDto } from './create-debtor-type.dto';

export class UpdateDebtorTypeDto extends PartialType(CreateDebtorTypeDto) {}
