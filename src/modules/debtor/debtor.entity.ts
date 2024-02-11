import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  BeforeUpdate,
  HasMany,
} from 'sequelize-typescript';
import { DebtorType } from '../debtor-type/debtor-type.entity';
import { Loan } from '../loan/loan.entity';

@Table({
  schema: 'solvencia',
  tableName: 'deudor',
  timestamps: true,
  paranoid: true,
})
export class Debtor extends Model<Debtor> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id_deudor: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deu_cod_matricula: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deu_nro_documento: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deu_nombres: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deu_apellido_paterno: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deu_apellido_materno: string;

  @ApiProperty()
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deu_fecha_nacimiento: Date;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deu_genero: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deu_direccion: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  deu_correo_electronico: string;

  @ApiProperty()
  @ForeignKey(() => DebtorType)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  id_tipo_deudor: number;

  @BelongsTo(() => DebtorType, { foreignKey: 'id_tipo_deudor' })
  debtorType: DebtorType;

  @HasMany(() => Loan, { foreignKey: 'id_deudor' })
  loan: Loan;

  @BeforeCreate
  @BeforeUpdate
  static async toUpperCaseBeforeUpsert(instance: Debtor) {
    instance.deu_nombres = instance.deu_nombres.trim().toUpperCase();
    instance.deu_apellido_paterno = instance.deu_apellido_paterno
      .trim()
      .toUpperCase();
    instance.deu_apellido_materno = instance.deu_apellido_materno
      .trim()
      .toUpperCase();
  }
}
