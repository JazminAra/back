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
  tableName: 'tipo_bien',
  timestamps: true,
  paranoid: true,
})
export class ObjectsType extends Model<ObjectsType> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_tipo_bien: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  tbie_nombre: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tbie_descripcion: string;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpsert(instance: ObjectsType) {
    instance.tbie_nombre = instance.tbie_nombre.toUpperCase();
  }
}
