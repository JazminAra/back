import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import { BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DebtorType } from '../../../modules/debtor-type/debtor-type.entity';

export class CreateDebtorDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deu_cod_matricula: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deu_nro_documento: string | null;

  @ApiProperty()
  @IsString()
  deu_nombres: string;

  @ApiProperty()
  @IsString()
  deu_apellido_paterno: string;

  @ApiProperty()
  @IsString()
  deu_apellido_materno: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deu_fecha_nacimiento: Date | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  deu_genero: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  deu_direccion: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  deu_correo_electronico: string | null;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ForeignKey(() => DebtorType)
  @BelongsTo(() => DebtorType, 'debtor-type')
  @Type(() => Number)
  id_tipo_deudor: number;
}
