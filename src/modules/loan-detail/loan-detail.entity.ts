import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Loan } from '../loan/loan.entity';
import { Objects } from '../objects/objects.entity';

@Table({
  schema: 'solvencia',
  tableName: 'detalle_prestamo',
  timestamps: true,
  paranoid: true,
})
export class LoanDetail extends Model<LoanDetail> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_detalle_prestamo: number;

  @ApiProperty()
  @ForeignKey(() => Loan)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_prestamo: number;

  @ApiProperty()
  @ForeignKey(() => Objects)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_bien: number;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  det_fecha_registro: Date;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  det_fecha_devolucion: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  det_lugar_uso: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  det_observacion: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  det_condicion: string;

  @BelongsTo(() => Loan, { foreignKey: 'id_prestamo' })
  loan: Loan;

  @BelongsTo(() => Objects, { foreignKey: 'id_bien' })
  objects: Objects;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpsert(instance: LoanDetail) {
    instance.det_lugar_uso = instance.det_lugar_uso.trim().toUpperCase();
    instance.det_observacion = instance.det_observacion.trim().toUpperCase();
    instance.det_condicion = instance.det_condicion.trim().toUpperCase();
  }

  @BeforeCreate
  static async createdAtToRegisterData(instance: LoanDetail) {
    instance.det_fecha_registro = instance.createdAt;
  }
}
