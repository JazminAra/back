import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateObjectsTypeDto, UpdateObjectsTypeDto } from '../dto/';
import { OBJECTS_TYPE_REPOSITORY } from '../../../core/constants/index';
import { ObjectsType } from '../objects-type.entity';
import { PaginationDto } from '../../../core/dto';
import { NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';

@Injectable()
export class ObjectsTypeService {
  constructor(
    @Inject(OBJECTS_TYPE_REPOSITORY)
    private readonly objectsTypeRepostory: typeof ObjectsType
  ) {}

  async create(
    createObjectsTypeDto: CreateObjectsTypeDto
  ): Promise<ObjectsType> {
    try {
      return await this.objectsTypeRepostory.create(createObjectsTypeDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination?: PaginationDto): Promise<ObjectsType[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.objectsTypeRepostory.findAll<ObjectsType>({
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<ObjectsType> {
    return await this.findByPk(id);
  }

  async findOneBy(name: string): Promise<ObjectsType> {
    const query = await this.objectsTypeRepostory.findOne({
      where: { tbie_nombre: name },
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados para el tipo ${name}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateObjectsTypeDto: UpdateObjectsTypeDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateObjectsTypeDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<ObjectsType> {
    const query = await this.objectsTypeRepostory.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
