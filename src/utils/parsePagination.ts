import { Pagination } from '../interfaces/Pagination';

export function parsePagination(pagination: any): Pagination {
  return {
    CurrentPage: pagination['current-page'],
    PreviousPage: pagination['previous-page'],
    NextPage: pagination['next-page'],
    TotalPages: pagination['total-pages'],
    TotalCount: pagination['total-count'],
  };
}
