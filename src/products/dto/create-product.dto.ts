import { IsString, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsString()
  barcode: string;

  @IsString()
  unit: string;

  @IsNumber()
  @IsPositive()
  minStock: number;

  @IsUUID()
  categoryId: string;
}


