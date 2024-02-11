import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateObjectsDto } from '../dto/create-objects.dto';
import { UpdateObjectsDto } from '../dto/update-objects.dto';
import { OBJECTS_REPOSITORY } from '../../../core/constants/index';
import { Objects } from '../objects.entity';
import { PaginationDto } from '../../../core/dto/pagination.dto';
import { Op } from 'sequelize';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { ObjectsType } from '../../objects-type/objects-type.entity';

@Injectable()
export class ObjectsService {
  constructor(
    @Inject(OBJECTS_REPOSITORY)
    private readonly objectsRepository: typeof Objects
  ) {}

  async create(createObjectDto: CreateObjectsDto): Promise<Objects> {
    try {
      return await this.objectsRepository.create(createObjectDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination?: PaginationDto): Promise<Objects[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.objectsRepository.findAll({
      include: [ObjectsType],
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findAllBy(cod: string, pagination?: PaginationDto): Promise<Objects[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.objectsRepository.findAll({
      where: {
        bie_codigo: { [Op.like]: `%${cod}%` },
      },
      include: [ObjectsType],
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException(
        `No se encontraron resultados para el codigo ${cod}`
      );
    return query;
  }

  async findOne(id: number): Promise<Objects> {
    return await this.findByPk(id);
  }

  async updateOne(
    id: number,
    updateObjectsDto: UpdateObjectsDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateObjectsDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<Objects> {
    const query = await this.objectsRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
