import { Pagination } from './Pagination';
import { Workspace } from './Workspace';

export interface WorkspaceList {
  Pagination: Pagination;
  Items: Workspace[];
}
