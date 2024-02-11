import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ORGAN_CHARGE_REPOSITORY } from '../../../core/constants/index';
import { PaginationDto } from 'src/core/dto';
import { OrganCharge } from '../organ-charge.entity';
import { CreateOrganChargeDto, UpdateOrganChargeDto } from '../dto';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { Organ } from '../../organ/organ.entity';

@Injectable()
export class OrganChargeService {
  constructor(
    @Inject(ORGAN_CHARGE_REPOSITORY)
    private readonly organChargeRepository: typeof OrganCharge
  ) {}

  async create(
    createOrganChargeDto: CreateOrganChargeDto
  ): Promise<OrganCharge> {
    try {
      return await this.organChargeRepository.create<OrganCharge>(
        createOrganChargeDto
      );
    } catch (error) {
      handlerExceptions(error);
    }
  }
  async findAll(pagination: PaginationDto): Promise<OrganCharge[]> {
    const { limit, offset } = pagination;
    const query = await this.organChargeRepository.findAll<OrganCharge>({
      include: [Organ],
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<OrganCharge> {
    return await this.findByPk(id);
  }

  async findOneBy(name: string): Promise<OrganCharge> {
    const query = await this.organChargeRepository.findOne<OrganCharge>({
      where: {
        oca_nombre: name,
      },
      include: [Organ],
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados el nombre ${name}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateOrganChargeDto: UpdateOrganChargeDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateOrganChargeDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<OrganCharge> {
    const query = await this.organChargeRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
