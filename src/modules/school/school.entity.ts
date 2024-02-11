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
import { Faculty } from '../faculty/faculty.entity';

@Table({
  schema: 'solvencia',
  tableName: 'escuela',
  timestamps: true,
  paranoid: true,
})
export class School extends Model<School> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_escuela: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  esc_nombre: string;

  @ApiProperty()
  @ForeignKey(() => Faculty)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_facultad: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  esc_sga_id: number;

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  esc_suv_id: number;

  @BelongsTo(() => Faculty, { foreignKey: 'id_facultad' })
  faculty: Faculty;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpset(instance: School) {
    instance.esc_nombre = instance.esc_nombre.trim().toUpperCase();
  }
}
