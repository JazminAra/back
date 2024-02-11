import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Rol } from '../roles/rol.entity';

@Table({
  // The table name in database.
  schema: 'sistemas',
  // The table name in database.
  tableName: 'aplicaciones_usuarios_roles',
  // Don't add the timestamp attributes (updatedAt, createdAt).
  timestamps: false,
})
export class UserRol extends Model<UserRol> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  aur_id: number;

  @ApiProperty()
  // groupId column is the id of the Roles table.
  @ForeignKey(() => Rol)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  apr_id: number;

  @ApiProperty()
  // userId column is the id of the Users table.
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usu_id: number;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  aur_created: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  aur_updated: Date;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  aur_estado: boolean;

  // @BelongsTo(() => User, { foreignKey: 'usu_id' } )
  // user: User;

  // @BelongsTo(() => Rol)
  // rol: Rol;
}
