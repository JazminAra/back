import { PartialType } from '@nestjs/swagger';
import { CreateLoanDetailDto } from './create-loan-detail.dto';

export class UpdateLoanDetailDto extends PartialType(CreateLoanDetailDto) {}
