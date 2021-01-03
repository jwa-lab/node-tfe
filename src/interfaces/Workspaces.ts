import { InlcudeRelatedResourcesOptions } from './InlcudeRelatedResourcesOptions';
import { Workspace } from './Workspace';
import { WorkspaceCreateOptions } from './WorkspaceCreateOptions';
import { WorkspaceList } from './WorkspaceList';
import { WorkspaceListOptions } from './WorkspaceListOptions';
import { WorkspaceLockOptions } from './WorkspaceLockOptions';
import { WorkspaceUpdateOptions } from './WorkspaceUpdateOptions';
import { WorkspaceVariable } from './WorkspaceVariable';
import { WorkspaceVariableCreateOptions } from './WorkspaceVariableCreateOptions';
import { WorkspaceVariableUpdateOptions } from './WorkspaceVariableUpdateOptions';

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
  read(
    organization: string,
    workspace: string,
    options?: InlcudeRelatedResourcesOptions
  ): Promise<Workspace>;

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

  // Lock a workspace by its ID.
  lock(workspaceId: string, options?: WorkspaceLockOptions): Promise<Workspace>;

  // Unlock a workspace by its ID.
  unlock(workspaceId: string): Promise<Workspace>;

  // ForceUnlock a workspace by its ID.
  forceUnlock(workspaceId: string): Promise<Workspace>;

  // createVariable is used to create a new workspace variable.
  createVariable(
    workspaceId: string,
    options: WorkspaceVariableCreateOptions
  ): Promise<WorkspaceVariable>;

  // List all the variables within a workspace.
  listVariables(workspaceId: string): Promise<WorkspaceVariable[]>;

  // Update settings of an existing workspace variable.
  updateVariable(
    workspaceId: string,
    variableId: string,
    options: WorkspaceVariableUpdateOptions
  ): Promise<WorkspaceVariable>;

  // Delete a workspace variable.
  deleteVariable(workspaceId: string, variableId: string): Promise<void>;
}
