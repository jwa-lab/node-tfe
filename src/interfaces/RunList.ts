import { Pagination } from './Pagination';
import { Run } from './Run';

export interface RunList {
  pagination: Pagination;
  items: Run[];
}
