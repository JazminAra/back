import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganTypeDto } from '../dto/create-organ-type.dto';
import { UpdateOrganTypeDto } from '../dto/update-organ-type.dto';
import { ORGAN_TYPE } from '../../../core/constants/index';
import { OrganType } from '../organ-type.entity';
import { PaginationDto } from 'src/core/dto';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';

@Injectable()
export class OrganTypeService {
  constructor(
    @Inject(ORGAN_TYPE) private readonly organTypeRepository: typeof OrganType
  ) {}

  async create(createOrganTypeDto: CreateOrganTypeDto): Promise<OrganType> {
    try {
      return await this.organTypeRepository.create<OrganType>(
        createOrganTypeDto
      );
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination?: PaginationDto): Promise<OrganType[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.organTypeRepository.findAll<OrganType>({
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<OrganType> {
    return await this.findByPk(id);
  }

  async findOneBy(name: string): Promise<OrganType> {
    const query = await this.organTypeRepository.findOne<OrganType>({
      where: {
        tor_nombre: name,
      },
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados para el nombre ${name}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateOrganTypeDto: UpdateOrganTypeDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateOrganTypeDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<OrganType> {
    const query = await this.organTypeRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
