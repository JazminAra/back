import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
  IsPositive,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';

export class CreateObjectsDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  id_organo: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  id_tipo_bien: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_codigo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_nombre: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_descripcion: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_estado_descripcion: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_libro_numero: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_libro_autor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_fuente_autor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_libro_isbn: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_libro_editorial: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_libro_idioma: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  bie_libro_fecha_publicacion: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_tesis_numero: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_tesis_autor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_tesis_fuente: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_tesis_asesor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  bie_tesis_fecha_publicacion: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_tablet_distribuidor: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  bie_tablet_fecha_entrega: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  bie_tablet_fecha_recepcion: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bie_matlab_encargado: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  bie_matlab_fecha_entrega: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  bie_matlab_fecha_recepcion: Date;
}
