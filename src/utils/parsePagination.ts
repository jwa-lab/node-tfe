import { Pagination } from '../interfaces/Pagination';

export function parsePagination(pagination: any): Pagination {
  return {
    currentPage: pagination['current-page'],
    previousPage: pagination['previous-page'],
    nextPage: pagination['next-page'],
    totalPages: pagination['total-pages'],
    totalCount: pagination['total-count'],
  };
}
