export interface PaginatedResult<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    size: number;
    totalPages: number;
  };
}
