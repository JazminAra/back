import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
// import { Group } from '../groups/group.entity';
// import { UserGroup } from '../user-groups/user-group.entity';
import { Rol } from '../roles/rol.entity';
import { UserRol } from '../user-roles/user-rol.entity';
import { Person } from '../person/person.entity';

@Table({
  // The table name in database.
  schema: 'sistemas',
  // The table name in database.
  tableName: 'usuarios',
  // Don't add the timestamp attributes (updatedAt, createdAt).
  timestamps: false,
})
export class User extends Model<User> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  usu_id: number;

  // @ApiProperty()
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // per_id: number;

  @ApiProperty()
  // per_id column is the id of the Person table.
  @ForeignKey(() => Person)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  per_id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  usu_login: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  usu_password: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  usu_ip_last: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  usu_date_last: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  usu_updated: Date;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  usu_estado: boolean;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  usu_date_baja: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  google_id: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  usu_last_access: Date;

  // Specifies the n:m relationship between the Users table and Groups table.
  // @HasMany(() => Rol,  { sourceKey: 'usu_id', foreignKey: 'usu_id' })
  // rol: Rol[];

  @BelongsToMany(() => Rol, () => UserRol)
  roles: Rol[];

  @BelongsTo(() => Person, { foreignKey: 'per_id' })
  persona: Person;
}
