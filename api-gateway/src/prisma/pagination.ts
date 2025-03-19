export interface PaginationOptions {
  page?: number; // 현재 페이지 번호
  take?: number; // 한 페이지에 가져올 데이터 수
  order?: 'asc' | 'desc'; // 정렬 방식
}

export interface PaginatedResult<T> {
  data: T[];

  paging: {
    totalRow?: number;
    currentPage: number;
    take: number;
  };
}
