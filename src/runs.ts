// Workspaces describes all the workspace related methods that the Terraform
// Enterprise API supports.

import urljoin from 'url-join';
import { ListOptions } from './interfaces/ListOptions';
import { Run } from './interfaces/Run';
import {
  RunApplyOptions,
  RunApplyOptionsSerializer,
} from './interfaces/RunApplyOptions';
import {
  RunCancelOptions,
  RunCancelOptionsSerializer,
} from './interfaces/RunCancelOptions';
import {
  RunCreateOptions,
  RunCreateOptionsSerializer,
} from './interfaces/RunCreateOptions';
import {
  RunDiscardOptions,
  RunDiscardOptionsSerializer,
} from './interfaces/RunDiscardOptions';
import {
  RunForceCancelOptions,
  RunForceCancelOptionsSerializer,
} from './interfaces/RunForceCancelOptions';
import { RunList } from './interfaces/RunList';
import { Runs as IRuns } from './interfaces/runs';
import { Client } from './tfe';
import { deserializer } from './utils/deserializer';
import { parsePagination } from './utils/parsePagination';

export class Runs implements IRuns {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async create(options: RunCreateOptions): Promise<Run> {
    const endpoint = '/runs';

    const serializedOptions = await RunCreateOptionsSerializer.serialize(
      options
    );

    const response = await this.client.post(endpoint, serializedOptions);
    return deserializer(response);
  }

  async list(workspaceId: string, options?: ListOptions): Promise<RunList> {
    const endpoint = urljoin('/workspaces/', encodeURI(workspaceId), '/runs');
    const response = await this.client.get(endpoint, options);

    const workspaceList = {
      pagination: parsePagination(response.meta.pagination),
      items: await deserializer(response),
    };
    return workspaceList;
  }

  async read(runId: string): Promise<Run> {
    const endpoint = urljoin('/runs/', encodeURI(runId));
    const response = await this.client.get(endpoint);
    return deserializer(response);
  }

  async apply(runId: string, options: RunApplyOptions): Promise<void> {
    const endpoint = urljoin('/runs/', encodeURI(runId), '/actions/apply');
    const serializedOptions = await RunApplyOptionsSerializer.serialize(
      options
    );
    await this.client.post(endpoint, serializedOptions);
  }
  async cancel(runId: string, options: RunCancelOptions): Promise<void> {
    const endpoint = urljoin('/runs/', encodeURI(runId), '/actions/cancel');
    const serializedOptions = await RunCancelOptionsSerializer.serialize(
      options
    );
    await this.client.post(endpoint, serializedOptions);
  }
  async forceCancel(
    runId: string,
    options: RunForceCancelOptions
  ): Promise<void> {
    const endpoint = urljoin(
      '/runs/',
      encodeURI(runId),
      '/actions/force-cancel'
    );
    const serializedOptions = await RunForceCancelOptionsSerializer.serialize(
      options
    );
    await this.client.post(endpoint, serializedOptions);
  }
  async discard(runId: string, options: RunDiscardOptions): Promise<void> {
    const endpoint = urljoin('/runs/', encodeURI(runId), '/actions/discard');
    const serializedOptions = await RunDiscardOptionsSerializer.serialize(
      options
    );
    await this.client.post(endpoint, serializedOptions);
  }
}
