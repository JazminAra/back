import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  DataType,
  Model,
  BeforeCreate,
  BeforeUpdate,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Campus } from '../campus/campus.entity';
import { OrganType } from '../organ-type/organ-type.entity';
import { Faculty } from '../faculty/faculty.entity';
import { School } from '../school/school.entity';

@Table({
  schema: 'solvencia',
  tableName: 'organo',
  timestamps: true,
  paranoid: true,
})
export class Organ extends Model<Organ> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_organo: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  org_nombre: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_escuela: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_facultad: number;

  @ApiProperty()
  @ForeignKey(() => Campus)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_sede: number;

  @ApiProperty()
  @ForeignKey(() => OrganType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_tipo_organo: number;

  @BelongsTo(() => Campus, { foreignKey: 'id_sede' })
  campus: Campus;

  @BelongsTo(() => OrganType, { foreignKey: 'id_tipo_organo' })
  organType: OrganType;

  @BelongsTo(() => School, { foreignKey: 'id_escuela' })
  school: School;

  @BelongsTo(() => Faculty, { foreignKey: 'id_facultad' })
  faculty: Faculty;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpset(instance: Organ) {
    instance.org_nombre = instance.org_nombre.trim().toUpperCase();
  }
}
