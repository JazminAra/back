import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { School } from '../school/school.entity';

@Table({
  schema: 'solvencia',
  tableName: 'facultad',
  timestamps: true,
  paranoid: true,
})
export class Faculty extends Model<Faculty> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_facultad: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  fac_nombre: string;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  fac_sga_id: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  fac_suv_id: number;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpset(instance: Faculty) {
    instance.fac_nombre = instance.fac_nombre.trim().toUpperCase();
  }
}
