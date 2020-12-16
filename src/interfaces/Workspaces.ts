import { Workspace } from './Workspace';
import { WorkspaceCreateOptions } from './WorkspaceCreateOptions';
import { WorkspaceList } from './WorkspaceList';
import { WorkspaceListOptions } from './WorkspaceListOptions';
import { WorkspaceUpdateOptions } from './WorkspaceUpdateOptions';

// TFE API docs: https://www.terraform.io/docs/enterprise/api/workspaces.html

export interface Workspaces {
  // List all the workspaces within an organization.
  list(
    organization: string,
    options: WorkspaceListOptions
  ): Promise<WorkspaceList>;

  // Create is used to create a new workspace.
  create(
    organization: string,
    options: WorkspaceCreateOptions
  ): Promise<Workspace>;

  // Read a workspace by its name.
  read(organization: string, workspace: string): Promise<Workspace>;

  // ReadByID reads a workspace by its ID.
  readById(workspaceID: string): Promise<Workspace>;

  // Update settings of an existing workspace.
  update(
    organization: string,
    workspace: string,
    options: WorkspaceUpdateOptions
  ): Promise<Workspace>;

  // UpdateByID updates the settings of an existing workspace.
  updateById(
    workspaceId: string,
    options: WorkspaceUpdateOptions
  ): Promise<Workspace>;

  // Delete a workspace by its name.
  delete(organization: string, workspace: string): Promise<void>;

  // DeleteByID deletes a workspace by its ID.
  deleteById(workspaceiD: string): Promise<void>;
}
