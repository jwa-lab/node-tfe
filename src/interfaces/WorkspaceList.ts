import { Pagination } from './Pagination';
import { Workspace } from './Workspace';

// WorkspaceList represents a list of workspaces.

export interface WorkspaceList {
  Pagination: Pagination;
  Items: Workspace[];
}
