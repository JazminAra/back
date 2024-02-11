import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebtorTypeDto } from '../dto/create-debtor-type.dto';
import { UpdateDebtorTypeDto } from '../dto/update-debtor-type.dto';
import { DEBTOR_TYPE } from '../../../core/constants/index';
import { PaginationDto } from 'src/core/dto';
import { DebtorType } from '../debtor-type.entity';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';

@Injectable()
export class DebtorTypeService {
  constructor(
    @Inject(DEBTOR_TYPE)
    private readonly debtorTypeRepository: typeof DebtorType
  ) {}

  async create(createDebtorTypeDto: CreateDebtorTypeDto): Promise<DebtorType> {
    try {
      return await this.debtorTypeRepository.create(createDebtorTypeDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }
  async findAll(pagination?: PaginationDto): Promise<DebtorType[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.debtorTypeRepository.findAll({
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<DebtorType> {
    return await this.findByPk(id);
  }

  async findOneBy(name: string): Promise<DebtorType> {
    const query = await this.debtorTypeRepository.findOne({
      where: { tipo_deudor_nombre: name },
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados para el nombre ${name}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateDebtorTypeDto: UpdateDebtorTypeDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateDebtorTypeDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<DebtorType> {
    const query = await this.debtorTypeRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
