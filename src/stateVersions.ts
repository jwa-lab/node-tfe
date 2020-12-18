import urljoin from 'url-join';
import { StateVersion } from './interfaces/StateVersion';
import { StateVersionCurrentOptions } from './interfaces/StateVersionCurrentOptions';
import { StateVersions as IStateVersions } from './interfaces/StateVersions';
import { Client } from './tfe';
import { deserializer } from './utils/deserializer';

export class StateVersions implements IStateVersions {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async currentWithOptions(
    workspaceId: string,
    options: StateVersionCurrentOptions
  ): Promise<StateVersion> {
    const endpoint = urljoin(
      '/workspaces/',
      encodeURI(workspaceId),
      '/current-state-version'
    );
    const response = await this.client.get(endpoint, options);

    return deserializer(response);
  }

  async current(workspaceId: string): Promise<StateVersion> {
    const endpoint = urljoin(
      '/workspaces/',
      encodeURI(workspaceId),
      '/current-state-version'
    );

    const response = await this.client.get(endpoint);
    return deserializer(response);
  }
}
