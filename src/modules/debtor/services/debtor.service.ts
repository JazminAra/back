import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDebtorDto } from '../dto/create-debtor.dto';
import { UpdateDebtorDto } from '../dto/update-debtor.dto';
import { DEBTOR_REPOSITORY } from '../../../core/constants/index';
import { PaginationDto } from 'src/core/dto';
import { Debtor } from '../debtor.entity';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { DebtorType } from '../../debtor-type/debtor-type.entity';
import { Op } from 'sequelize';
import { Loan } from '../../../modules/loan/loan.entity';
import { LoanDetail } from '../../../modules/loan-detail/loan-detail.entity';
import { Objects } from '../../../modules/objects/objects.entity';
import { ObjectsType } from '../../../modules/objects-type/objects-type.entity';
import { Organ } from '../../../modules/organ/organ.entity';

@Injectable()
export class DebtorService {
  constructor(
    @Inject(DEBTOR_REPOSITORY) private readonly debtorRepository: typeof Debtor
  ) {}
  async create(createDebtorDto: CreateDebtorDto): Promise<Debtor> {
    try {
      return await this.debtorRepository.create(createDebtorDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination?: PaginationDto): Promise<Debtor[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.debtorRepository.findAll({
      include: [DebtorType],
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findStudent(docNum: string): Promise<unknown[]> {
    const [
      results,
      medatada,
    ] = await this.debtorRepository.sequelize.query(
      'SELECT * from linkeo_servers.fn_get_alumno(:doc_number)',
      { replacements: { doc_number: docNum } }
    );
    if (results.length === 0)
      throw new NotFoundException(
        `No se encontraron resultados para el numero de documento ${docNum}`
      );
    return results;
  }

  async findOne(id: number): Promise<Debtor> {
    return await this.findByPk(id);
  }

  async findOneBy(docNum: string): Promise<Debtor> {
    const query = await this.debtorRepository.findOne({
      where: {
        [Op.or]: [{ deu_cod_matricula: docNum }, { deu_nro_documento: docNum }],
      },
      include: [
        DebtorType,
        {
          model: Loan,
          include: [
            {
              model: LoanDetail,
              include: [{ model: Objects, include: [ObjectsType, Organ] }],
            },
          ],
        },
      ],
    });

    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados para el numero de documento ${docNum}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateDebtorDto: UpdateDebtorDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateDebtorDto);
    } catch (error) {
      handlerExceptions(error);
    }
    return true;
  }

  async softDelete(id: number) {
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

  private async findByPk(id: number, paranoid?: boolean): Promise<Debtor> {
    const query = await this.debtorRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
