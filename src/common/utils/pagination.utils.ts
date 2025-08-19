import { FindAllQueryDto } from "../dto/find-all-query.dto";
import { PaginatedResult } from "../interfaces/pagination.interface";

export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  query: FindAllQueryDto,
): PaginatedResult<T> {
  // Use default values if size is somehow undefined
  const size = query.size || 10;
  const page = query.page || 1;
  const totalPages = Math.ceil(total / size);

  return {
    items: data,
    meta: {
      total,
      page,
      size,
      totalPages,
    },
  };
}
