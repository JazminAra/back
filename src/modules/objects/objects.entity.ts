import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ObjectsType } from '../objects-type/objects-type.entity';
import { Organ } from '../organ/organ.entity';

@Table({
  schema: 'solvencia',
  tableName: 'bien',
  timestamps: true,
  paranoid: true,
})
export class Objects extends Model<Objects> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_bien: number;

  @ApiProperty()
  @ForeignKey(() => Organ)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_organo: number;

  @ApiProperty()
  @ForeignKey(() => ObjectsType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_tipo_bien: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  bie_codigo: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_nombre: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_descripcion: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_estado_description: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bie_libro_numero: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bie_libro_autor: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_fuente_autor: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_libro_isbn: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_libro_editorial: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_libro_idioma: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  bie_libro_fecha_publicacion: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_tesis_numero: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_tesis_autor: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_tesis_fuente: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_tesis_asesor: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  bie_tesis_fecha_publicacion: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_tablet_distribuidor: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  bie_tablet_fecha_entrega: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  bie_tablet_fecha_recepcion: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bie_matlab_encargado: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  bie_matlab_fecha_entrega: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  bie_matlab_fecha_recepcion: Date;

  @BelongsTo(() => Organ, { foreignKey: 'id_organo' })
  organ: Organ;

  @BelongsTo(() => ObjectsType, { foreignKey: 'id_tipo_bien' })
  objectsType: ObjectsType;
}
