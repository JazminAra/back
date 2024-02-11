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
import { Organ } from '../organ/organ.entity';

@Table({
  schema: 'solvencia',
  tableName: 'organo_cargo',
  timestamps: true,
  paranoid: true,
})
export class OrganCharge extends Model<OrganCharge> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_organo_cargo: number;

  @ApiProperty()
  @ForeignKey(() => Organ)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_organo: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  oca_nombre: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  oca_cargo_nivel: string;

  @BelongsTo(() => Organ, { foreignKey: 'id_organo' })
  organ: Organ;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpsert(instance: OrganCharge) {
    instance.oca_cargo_nivel = instance.oca_cargo_nivel.trim().toUpperCase();
    instance.oca_nombre = instance.oca_nombre.trim().toUpperCase();
  }
}
