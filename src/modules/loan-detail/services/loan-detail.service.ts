import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateLoanDetailDto } from '../dto/create-loan-detail.dto';
import { UpdateLoanDetailDto } from '../dto/update-loan-detail.dto';
import { LOAN_DETAIL_REPOSITORY } from '../../../core/constants/index';
import { LoanDetail } from '../loan-detail.entity';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { PaginationDto } from '../../../core/dto/pagination.dto';
import { Loan } from '../../loan/loan.entity';
import { Objects } from '../../objects/objects.entity';
import { ParamsDto } from '../dto/params.dto';

@Injectable()
export class LoanDetailService {
  constructor(
    @Inject(LOAN_DETAIL_REPOSITORY)
    private readonly loanDetailRepository: typeof LoanDetail
  ) {}

  async create(createLoanDetailDto: CreateLoanDetailDto): Promise<LoanDetail> {
    try {
      return await this.loanDetailRepository.create(createLoanDetailDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAllBy(params: ParamsDto): Promise<LoanDetail[]> {
    const { id_prestamo, limit, offset = 0 } = params;
    const query = await this.loanDetailRepository.findAll({
      include: [{ model: Loan, where: { id_prestamo } }, Objects],
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException(
        `No se encontraron resultados para el id ${id_prestamo}`
      );
    return query;
  }

  async findOne(id: number): Promise<LoanDetail> {
    return await this.findByPk(id);
  }

  async updateOne(
    id: number,
    updateLoanDetailDto: UpdateLoanDetailDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateLoanDetailDto);
    } catch (error) {
      handlerExceptions(error);
    }
    return true;
  }

  async softDelete(id: number): Promise<boolean> {
    const query = await this.findByPk(id);
    await query.destroy();
    return true;
  }

  async restore(id: number): Promise<boolean> {
    const query = await this.findByPk(id, false);
    if (!query.deletedAt)
      throw new NotFoundException(`El id ${id} no se encuentra eliminado`);
    await query.restore();
    return true;
  }

  private async findByPk(id: number, paranoid?: boolean): Promise<LoanDetail> {
    const query = await this.loanDetailRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
