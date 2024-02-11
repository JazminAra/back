import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';
import { Debtor } from '../debtor/debtor.entity';
import { LoanDetail } from '../loan-detail/loan-detail.entity';

@Table({
  schema: 'solvencia',
  tableName: 'prestamo',
  timestamps: true,
  paranoid: true,
})
export class Loan extends Model<Loan> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_prestamo: number;

  @ApiProperty()
  @ForeignKey(() => Debtor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_deudor: number;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  pre_fecha_registro: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pre_fecha_devolucion: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  pre_tiempo_limite: Date;

  @BelongsTo(() => Debtor, { foreignKey: 'id_deudor' })
  debtor: Debtor;

  @HasMany(() => LoanDetail, { foreignKey: 'id_prestamo' })
  loanDetail: LoanDetail;

  @BeforeCreate
  static async createdAtToRegisterData(instance: Loan) {
    instance.pre_fecha_registro = instance.createdAt;
  }
}
