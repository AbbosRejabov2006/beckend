import { IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export class FindAllQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number = 10;

  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.DESC;

  getSkip(): number {
    return (this.page - 1) * this.size;
  }

  getTake(): number {
    return this.size;
  }
}
