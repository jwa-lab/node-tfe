import { ListOptions } from './ListOptions';

// WorkspaceListOptions represents the options for listing workspaces.

export interface WorkspaceListOptions extends ListOptions {
  // A search string (partial workspace name) used to filter the results.
  'search[name]'?: string;

  // A list of relations to include. See available resources https://www.terraform.io/docs/cloud/api/workspaces.html#available-related-resources
  include?: string;
}
