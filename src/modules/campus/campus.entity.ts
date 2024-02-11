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
  tableName: 'sede',
  timestamps: true,
  paranoid: true,
})
export class Campus extends Model<Campus> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_sede: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  sed_nombre: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sed_ubigeo: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  sed_sga_id: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  sed_suv_id: number;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpset(instance: Campus) {
    instance.sed_nombre = instance.sed_nombre.trim().toUpperCase();
  }
}
