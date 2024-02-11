import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from '../dto/create-school.dto';
import { UpdateSchoolDto } from '../dto/update-school.dto';
import { SCHOOL_REPOSITORY } from '../../../core/constants/index';
import { PaginationDto } from 'src/core/dto';
import { School } from '../school.entity';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { Faculty } from '../../faculty/faculty.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class SchoolService {
  constructor(
    @Inject(SCHOOL_REPOSITORY) private readonly schoolRepository: typeof School
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    try {
      return await this.schoolRepository.create<School>(createSchoolDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination?: PaginationDto): Promise<School[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.schoolRepository.findAll({
      include: [Faculty],
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<School> {
    const query = await this.schoolRepository.findByPk(id, {
      include: [Faculty],
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }

  async findOneBy(name: string): Promise<School> {
    const query = await this.schoolRepository.findOne({
      where: {
        esc_nombre: name,
      },
      include: [Faculty],
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados para con el nombre ${name}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateSchoolDto: UpdateSchoolDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateSchoolDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<School> {
    const query = await this.schoolRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
