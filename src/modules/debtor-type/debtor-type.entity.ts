import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  DataType,
  Model,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';

@Table({
  schema: 'solvencia',
  tableName: 'tipo_deudor',
  timestamps: true,
  paranoid: true,
})
export class DebtorType extends Model<DebtorType> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_tipo_deudor: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  tipo_deudor_nombre: string;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpset(instance: DebtorType) {
    instance.tipo_deudor_nombre = instance.tipo_deudor_nombre
      .trim()
      .toUpperCase();
  }
}
