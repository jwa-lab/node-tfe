import { Pagination } from './Pagination';
import { Workspace } from './Workspace';

export interface WorkspaceList {
  pagination: Pagination;
  items: Workspace[];
}
