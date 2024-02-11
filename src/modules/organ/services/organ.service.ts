import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ORGAN_REPOSITORY } from '../../../core/constants/index';
import { PaginationDto } from 'src/core/dto';
import { Organ } from '../organ.entity';
import { CreateOrganDto, UpdateOrganDto } from '../dto';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { Campus } from '../../campus/campus.entity';
import { OrganType } from '../../organ-type/organ-type.entity';
import { School } from '../../../modules/school/school.entity';
import { Faculty } from '../../../modules/faculty/faculty.entity';

@Injectable()
export class OrganService {
  constructor(
    @Inject(ORGAN_REPOSITORY) private readonly organRepository: typeof Organ
  ) {}

  async create(createOrganDto: CreateOrganDto): Promise<Organ> {
    try {
      return await this.organRepository.create<Organ>(createOrganDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination?: PaginationDto): Promise<Organ[]> {
    const { limit, offset } = pagination;
    const query = await this.organRepository.findAll<Organ>({
      include: [Campus, OrganType, School, Faculty],
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<Organ> {
    const query = await this.organRepository.findByPk(id, {
      include: [Campus, OrganType, School, Faculty],
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }

  async findOneBy(name: string): Promise<Organ> {
    const query = await this.organRepository.findOne<Organ>({
      where: {
        org_nombre: name,
      },
      include: [Campus, OrganType],
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados con el nombre ${name}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateOrganDto: UpdateOrganDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateOrganDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<Organ> {
    const query = await this.organRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
