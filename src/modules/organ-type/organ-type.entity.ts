import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  schema: 'solvencia',
  tableName: 'tipo_organo',
  timestamps: true,
  paranoid: true,
})
export class OrganType extends Model<OrganType> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_tipo_organo: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  tor_nombre: string;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpset(instance: OrganType) {
    instance.tor_nombre = instance.tor_nombre.trim().toUpperCase();
  }
}
