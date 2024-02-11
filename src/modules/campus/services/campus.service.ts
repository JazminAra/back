import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampusDto } from '../dto/create-campus.dto';
import { UpdateCampusDto } from '../dto/update-campus.dto';
import { CAMPUS_TYPE } from '../../../core/constants/index';
import { Campus } from '../campus.entity';
import { PaginationDto } from 'src/core/dto';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';

@Injectable()
export class CampusService {
  constructor(
    @Inject(CAMPUS_TYPE) private readonly campusTypeRepository: typeof Campus
  ) {}

  async create(createCampusDto: CreateCampusDto): Promise<Campus> {
    try {
      return await this.campusTypeRepository.create(createCampusDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }
  async findAll(pagination: PaginationDto): Promise<Campus[]> {
    const { limit = 10, offset = 0 } = pagination;
    const query = await this.campusTypeRepository.findAll({
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<Campus> {
    return await this.findByPk(id);
  }

  async findOneBy(name: string): Promise<Campus> {
    const query = await this.campusTypeRepository.findOne({
      where: { sed_nombre: name },
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados para id ${name}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateCampusDto: UpdateCampusDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateCampusDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<Campus> {
    const query = await this.campusTypeRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
