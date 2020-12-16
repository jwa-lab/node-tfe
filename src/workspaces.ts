// Workspaces describes all the workspace related methods that the Terraform
// Enterprise API supports.

import urljoin from 'url-join';
import { Workspace } from './interfaces/Workspace';
import {
  WorkspaceCreateOptions,
  WorkspaceCreateOptionsSerializer,
} from './interfaces/WorkspaceCreateOptions';
import { WorkspaceList } from './interfaces/WorkspaceList';
import { WorkspaceListOptions } from './interfaces/WorkspaceListOptions';
import {
  WorkspaceLockOptions,
  WorkspaceLockOptionsSerializer,
} from './interfaces/WorkspaceLockOptions';
import { Workspaces as IWorkspaces } from './interfaces/Workspaces';
import {
  WorkspaceUpdateOptions,
  WorkspaceUpdateOptionsSerializer,
} from './interfaces/WorkspaceUpdateOptions';
import { Client } from './tfe';
import { deserializer } from './utils/deserializer';
import { parsePagination } from './utils/parsePagination';

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
    return deserializer(response);
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
      items: await deserializer(response),
    };
    return workspaceList;
  }

  async read(organization: string, workspaceName: string): Promise<Workspace> {
    const endpoint = urljoin(
      '/organizations/',
      encodeURI(organization),
      '/workspaces',
      encodeURI(workspaceName)
    );
    const response = await this.client.get(endpoint);
    return deserializer(response);
  }

  async readById(workspaceId: string): Promise<Workspace> {
    const endpoint = urljoin('/workspaces', encodeURI(workspaceId));
    const response = await this.client.get(endpoint);
    return deserializer(response);
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
    return deserializer(response);
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
    return deserializer(response);
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
    return deserializer(response);
  }

  async unlock(workspaceId: string): Promise<Workspace> {
    const endpoint = urljoin(
      '/workspaces',
      encodeURI(workspaceId),
      '/actions/unlock'
    );

    const response = await this.client.post(endpoint);
    return deserializer(response);
  }

  async forceUnlock(workspaceId: string): Promise<Workspace> {
    const endpoint = urljoin(
      '/workspaces',
      encodeURI(workspaceId),
      '/actions/force-unlock'
    );

    const response = await this.client.post(endpoint);
    return deserializer(response);
  }
}
