import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { Rol } from './../rol.entity';
import { UsersService } from '../../users/services/users.service';
import { CreateRolDto } from '../dto/create-rol.dto';
import { ROL_REPOSITORY } from '../../../core/constants';
// import { UserGroupDto } from '../user-groups/dto/user-group.dto';
import { UserRolDto } from '../../user-roles/dto/user-rol.dto';
import { PaginationDto } from 'src/core/dto';
import { handlerExceptions } from '../../../core/database/handler/handler-exceptions';
import { UpdateRolDto } from '../dto/update-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROL_REPOSITORY) private readonly rolRepository: typeof Rol,
    private readonly userService: UsersService
  ) {}

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    try {
      return await this.rolRepository.create(createRolDto);
    } catch (error) {
      handlerExceptions(error);
    }
  }

  async findAll(pagination: PaginationDto): Promise<Rol[]> {
    const { limit, offset = 0 } = pagination;
    const query = await this.rolRepository.findAll({ limit, offset });
    if (query.length === 0)
      throw new NotFoundException('No se encontraron resultados');
    return query;
  }

  async findOne(id: number): Promise<Rol> {
    return await this.rolRepository.findByPk(id);
  }

  async updateOne(id: number, updateRolDto: UpdateRolDto): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.update(updateRolDto);
    } catch (error) {
      handlerExceptions(error);
    }
    return true;
  }

  async deleteOne(id: number): Promise<boolean> {
    const query = await this.findByPk(id);
    try {
      await query.destroy();
    } catch (error) {
      handlerExceptions(error);
    }
    return true;
  }

  async addUsersToGroup(userRoles: UserRolDto): Promise<boolean> {
    const users = await this.userService.findAllByIds(userRoles.userIds);
    const rol = await this.rolRepository.findOne({
      where: { id: userRoles.aur_id },
    });

    if (!users || !rol) return false;

    rol.$set('users', users);

    return true;
  }

  private async findByPk(id: number): Promise<Rol> {
    const query = await this.rolRepository.findByPk(id);
    if (!query) throw new NotFoundException(`El id ${id} no existe`);
    return query;
  }
}
