import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFacultyDto } from '../dto/create-faculty.dto';
import { UpdateFacultyDto } from '../dto/update-faculty.dto';
import { FACULTY_REPOSITORY } from '../../../core/constants';
import { Faculty } from '../faculty.entity';
import { PaginationDto } from 'src/core/dto';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { School } from '../../../modules/school/school.entity';
import { Op } from 'sequelize';

@Injectable()
export class FacultyService {
  constructor(
    @Inject(FACULTY_REPOSITORY)
    private readonly facultyRepository: typeof Faculty
  ) {}

  async create(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    try {
      return await this.facultyRepository.create(createFacultyDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto): Promise<Faculty[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.facultyRepository.findAll({
      limit,
      offset,
    });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<Faculty> {
    return await this.findByPk(id);
  }

  async findOneBy(name: string): Promise<Faculty> {
    const query = await this.facultyRepository.findOne({
      where: { fac_nombre: name },
    });
    if (!query)
      throw new NotFoundException(
        `No se encontraron resultados para el nombre ${name}`
      );
    return query;
  }

  async updateOne(
    id: number,
    updateFacultyDto: UpdateFacultyDto
  ): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateFacultyDto);
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

  private async findByPk(id: number, paranoid?: boolean): Promise<Faculty> {
    const query = await this.facultyRepository.findByPk(id, {
      paranoid: paranoid ?? true,
    });
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
