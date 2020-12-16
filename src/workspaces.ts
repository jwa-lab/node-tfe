// Workspaces describes all the workspace related methods that the Terraform
// Enterprise API supports.
//

import { Serializer } from 'jsonapi-serializer';
import urljoin from 'url-join';
import { Workspace } from './interfaces/Workspace';
import { WorkspaceCreateOptions } from './interfaces/WorkspaceCreateOptions';
import { WorkspaceList } from './interfaces/WorkspaceList';
import { WorkspaceListOptions } from './interfaces/WorkspaceListOptions';
import { Workspaces as IWorkspaces } from './interfaces/Workspaces';
import { Client } from './tfe';
import { deserializer } from './utils/deserializer';
import { parsePagination } from './utils/parsePagination';

const WorkspaceCreateOptionsSerializer = new Serializer('workspaces', {
  attributes: [
    'AgentPoolID',
    'AllowDestroyPlan',
    'AutoApply',
    'ExecutionMode',
    'FileTriggersEnabled',
    'MigrationEnvironment',
    'Name',
    'QueueAllRuns',
    'SpeculativeEnabled',
    'TerraformVersion',
    'TriggerPrefixes',
    'WorkingDirectory',
  ],
});

export class Workspaces implements IWorkspaces {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async Create(
    organization: string,
    options: WorkspaceCreateOptions
  ): Promise<Workspace> {
    const endpoint = urljoin(
      '/organizations',
      encodeURI(organization),
      'workspaces'
    );
    const serializedOptions = await WorkspaceCreateOptionsSerializer.serialize(
      options
    );

    const response = await this.client.post(endpoint, serializedOptions);
    return deserializer(response);
  }

  async List(
    organization: string,
    options?: WorkspaceListOptions
  ): Promise<WorkspaceList> {
    const endpoint = urljoin(
      '/organizations/',
      encodeURI(organization),
      '/workspaces'
    );
    const response = await this.client.get(endpoint, options);

    const workspaceList = {
      Pagination: parsePagination(response.meta.pagination),
      Items: await deserializer(response),
    };
    return workspaceList;
  }

  async Read(organization: string, workspaceName: string): Promise<Workspace> {
    const endpoint = urljoin(
      '/organizations/',
      encodeURI(organization),
      '/workspaces',
      encodeURI(workspaceName)
    );
    const response = await this.client.get(endpoint);
    return deserializer(response);
  }

  async ReadByID(workspaceId: string): Promise<Workspace> {
    const endpoint = urljoin('/workspaces', encodeURI(workspaceId));
    const response = await this.client.get(endpoint);
    return deserializer(response);
  }
}
