// Workspaces describes all the workspace related methods that the Terraform
// Enterprise API supports.

import urljoin from 'url-join';
import { InlcudeRelatedResourcesOptions } from '../interfaces/InlcudeRelatedResourcesOptions';
import { Workspace } from '../interfaces/Workspace';
import {
  WorkspaceCreateOptions,
  WorkspaceCreateOptionsSerializer,
} from '../interfaces/WorkspaceCreateOptions';
import { WorkspaceList } from '../interfaces/WorkspaceList';
import { WorkspaceListOptions } from '../interfaces/WorkspaceListOptions';
import {
  WorkspaceLockOptions,
  WorkspaceLockOptionsSerializer,
} from '../interfaces/WorkspaceLockOptions';
import { Workspaces as IWorkspaces } from '../interfaces/Workspaces';
import {
  WorkspaceUpdateOptions,
  WorkspaceUpdateOptionsSerializer,
} from '../interfaces/WorkspaceUpdateOptions';
import { WorkspaceVariable } from '../interfaces/WorkspaceVariable';
import {
  WorkspaceVariableCreateOptions,
  WorkspaceVariableCreateOptionsSerializer,
} from '../interfaces/WorkspaceVariableCreateOptions';
import {
  WorkspaceVariableUpdateOptions,
  WorkspaceVariableUpdateOptionsSerializer,
} from '../interfaces/WorkspaceVariableUpdateOptions';
import { Client } from '../tfe';
import { deserialize } from '../utils/deserializer';
import { parsePagination } from '../utils/parsePagination';
export class Workspaces implements IWorkspaces {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async create(
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
    return deserialize(response);
  }

  async list(
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
      pagination: parsePagination(response.meta.pagination),
      items: await deserialize(response),
    };
    return workspaceList;
  }

  async read(
    organization: string,
    workspaceName: string,
    options?: InlcudeRelatedResourcesOptions
  ): Promise<Workspace> {
    const endpoint = urljoin(
      '/organizations/',
      encodeURI(organization),
      '/workspaces',
      encodeURI(workspaceName)
    );
    const response = await this.client.get(endpoint, options);
    const deserializedResponse = await deserialize(response);
    return deserializedResponse;
  }

  async readById(workspaceId: string): Promise<Workspace> {
    const endpoint = urljoin('/workspaces', encodeURI(workspaceId));
    const response = await this.client.get(endpoint);
    return deserialize(response);
  }

  async update(
    organization: string,
    workspace: string,
    options: WorkspaceUpdateOptions
  ): Promise<Workspace> {
    const endpoint = urljoin(
      '/organizations',
      encodeURI(organization),
      'workspaces',
      encodeURI(workspace)
    );
    const serializedOptions = await WorkspaceUpdateOptionsSerializer.serialize(
      options
    );

    const response = await this.client.patch(endpoint, serializedOptions);
    return deserialize(response);
  }

  async updateById(
    workspaceId: string,
    options: WorkspaceUpdateOptions
  ): Promise<Workspace> {
    const endpoint = urljoin('/workspaces', encodeURI(workspaceId));
    const serializedOptions = await WorkspaceUpdateOptionsSerializer.serialize(
      options
    );

    const response = await this.client.patch(endpoint, serializedOptions);
    return deserialize(response);
  }

  async delete(organization: string, workspace: string): Promise<void> {
    const endpoint = urljoin(
      '/organizations',
      encodeURI(organization),
      'workspaces',
      encodeURI(workspace)
    );

    return this.client.delete(endpoint);
  }

  async deleteById(workspaceId: string): Promise<void> {
    const endpoint = urljoin('/workspaces', encodeURI(workspaceId));

    return this.client.delete(endpoint);
  }

  async lock(
    workspaceId: string,
    options: WorkspaceLockOptions = {}
  ): Promise<Workspace> {
    const endpoint = urljoin(
      '/workspaces',
      encodeURI(workspaceId),
      '/actions/lock'
    );

    const serializedOptions = await WorkspaceLockOptionsSerializer.serialize(
      options
    );

    const response = await this.client.post(endpoint, serializedOptions);
    return deserialize(response);
  }

  async unlock(workspaceId: string): Promise<Workspace> {
    const endpoint = urljoin(
      '/workspaces',
      encodeURI(workspaceId),
      '/actions/unlock'
    );

    const response = await this.client.post(endpoint);
    return deserialize(response);
  }

  async forceUnlock(workspaceId: string): Promise<Workspace> {
    const endpoint = urljoin(
      '/workspaces',
      encodeURI(workspaceId),
      '/actions/force-unlock'
    );

    const response = await this.client.post(endpoint);
    return deserialize(response);
  }

  async createVariable(
    workspaceId: string,
    options: WorkspaceVariableCreateOptions
  ): Promise<WorkspaceVariable> {
    const endpoint = urljoin('/workspaces', encodeURI(workspaceId), 'vars');
    const serializedOptions = await WorkspaceVariableCreateOptionsSerializer.serialize(
      options
    );

    const response = await this.client.post(endpoint, serializedOptions);
    return deserialize(response);
  }

  async listVariables(workspaceId: string): Promise<WorkspaceVariable[]> {
    const endpoint = urljoin('/workspaces/', encodeURI(workspaceId), 'vars');
    const response = await this.client.get(endpoint);
    return deserialize(response);
  }

  async updateVariable(
    workspaceId: string,
    variableId: string,
    options: WorkspaceVariableUpdateOptions
  ): Promise<WorkspaceVariable> {
    const endpoint = urljoin(
      '/workspaces',
      encodeURI(workspaceId),
      'vars',
      encodeURI(variableId)
    );
    const serializedOptions = await WorkspaceVariableUpdateOptionsSerializer.serialize(
      options
    );

    const response = await this.client.patch(endpoint, serializedOptions);
    return deserialize(response);
  }

  async deleteVariable(workspaceId: string, variableId: string): Promise<void> {
    const endpoint = urljoin(
      '/workspaces',
      encodeURI(workspaceId),
      'vars',
      encodeURI(variableId)
    );

    return this.client.delete(endpoint);
  }
}
