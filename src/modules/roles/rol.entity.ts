import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRol } from '../user-roles/user-rol.entity';
import { User } from '../users/user.entity';

@Table({
  // The table name in database.
  schema: 'sistemas',
  // The table name in database.
  tableName: 'aplicaciones_roles',
  // Don't add the timestamp attributes (updatedAt, createdAt).
  timestamps: false,
})
export class Rol extends Model<Rol> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  apr_id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  apr_nombre: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  apr_descripcion: string;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  apr_estado: boolean;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  app_id: number;

  // Specifies the n:m relationship between the Users table and Groups table.
  // @BelongsToMany(() => Rol, () => UserRol, 'apr_id')
  // rol: Rol;

  @BelongsToMany(() => User, () => UserRol)
  users: User[];
}
