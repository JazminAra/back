import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
// import { User } from '../users/user.entity';
// import { Rol } from '../roles/rol.entity';

@Table({
  // The table name in database.
  schema: 'public',
  // The table name in database.
  tableName: 'persona',
  // Don't add the timestamp attributes (updatedAt, createdAt).
  timestamps: false,
})
export class Person extends Model<Person> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  per_id: number;

  // @ApiProperty()
  // // groupId column is the id of the Roles table.
  // @ForeignKey(() => Rol)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // apr_id: number;

  // @ApiProperty()
  // // userId column is the id of the Users table.
  // @ForeignKey(() => User)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // usu_id: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tdi_id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  per_nro_doc_identidad: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  per_ap_paterno: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  per_ap_materno: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  per_nombres: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  eci_id: number;

  @ApiProperty()
  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  per_fecha_nacimiento: Date;

  @ApiProperty()
  @Column({
    type: DataType.CHAR(1),
    allowNull: false,
  })
  per_sexo: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  per_celular: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  per_telefono: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  per_email_institucional: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  per_email_personal: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(6),
    allowNull: false,
  })
  cod_ubigeo_nacimiento: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING(6),
    allowNull: false,
  })
  cod_ubigeo_domicilio: string;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  per_estado: boolean;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  per_created: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  per_updated: Date;

  // @BelongsTo(() => User, { foreignKey: 'usu_id' } )
  // user: User;

  // @BelongsTo(() => Rol)
  // rol: Rol;
}
