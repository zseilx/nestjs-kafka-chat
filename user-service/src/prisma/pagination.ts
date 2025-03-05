export interface PaginationOptions {
  page?: number;
  take?: number;
  order?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];

  paging: {
    totalRow?: number;
    currentPage: number;
    take: number;
  };
}
