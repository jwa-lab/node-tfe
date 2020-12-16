import { Workspace } from './Workspace';
import { WorkspaceCreateOptions } from './WorkspaceCreateOptions';
import { WorkspaceList } from './WorkspaceList';
import { WorkspaceListOptions } from './WorkspaceListOptions';
import { WorkspaceUpdateOptions } from './WorkspaceUpdateOptions';

// TFE API docs: https://www.terraform.io/docs/enterprise/api/workspaces.html

export interface Workspaces {
  // List all the workspaces within an organization.
  List(
    organization: string,
    options: WorkspaceListOptions
  ): Promise<WorkspaceList>;

  // Create is used to create a new workspace.
  Create(
    organization: string,
    options: WorkspaceCreateOptions
  ): Promise<Workspace>;

  // Read a workspace by its name.
  Read(organization: string, workspace: string): Promise<Workspace>;

  // ReadByID reads a workspace by its ID.
  ReadByID(workspaceID: string): Promise<Workspace>;

  // Update settings of an existing workspace.
  Update(
    organization: string,
    workspace: string,
    options: WorkspaceUpdateOptions
  ): Promise<Workspace>;
}
