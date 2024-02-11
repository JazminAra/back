import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { UpdateLoanDto } from '../dto/update-loan.dto';
import { LOAN_REPOSITORY } from '../../../core/constants/index';
import { Loan } from '../loan.entity';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { Debtor } from '../../debtor/debtor.entity';
import { DebtorService } from '../../debtor/services/debtor.service';

@Injectable()
export class LoanService {
  constructor(
    @Inject(LOAN_REPOSITORY) private readonly loanRepository: typeof Loan,
    private readonly debtorService: DebtorService
  ) {}

  async create(createLoanDto: CreateLoanDto): Promise<Loan> {
    try {
      return await this.loanRepository.create<Loan>(createLoanDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAllBy(docNum: string): Promise<Loan[]> {
    const debtor = await this.debtorService.findOneBy(docNum);
    const query = await this.loanRepository.findAll<Loan>({
      include: [{ model: Debtor, where: { id_deudor: debtor.id_deudor } }],
    });
    if (query.length === 0)
      throw new NotFoundException(
        `No se encontraron resultados para el dedudor ${debtor.deu_nombres}`
      );
    return query;
  }

  async findOne(id: number): Promise<Loan> {
    return await this.findByPk(id);
  }

  async updateOne(id: number, updateLoanDto: UpdateLoanDto): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateLoanDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<Loan> {
    const query = await this.loanRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
