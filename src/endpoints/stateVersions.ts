import urljoin from 'url-join';
import { InlcudeRelatedResourcesOptions } from '../interfaces/InlcudeRelatedResourcesOptions';
import { StateVersion } from '../interfaces/StateVersion';
import { StateVersions as IStateVersions } from '../interfaces/StateVersions';
import { Client } from '../tfe';
import { deserialize } from '../utils/deserializer';

export class StateVersions implements IStateVersions {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async currentWithOptions(
    workspaceId: string,
    options?: InlcudeRelatedResourcesOptions
  ): Promise<StateVersion> {
    const endpoint = urljoin(
      '/workspaces/',
      encodeURI(workspaceId),
      '/current-state-version'
    );
    const response = await this.client.get(endpoint, options);

    return deserialize(response);
  }

  async current(workspaceId: string): Promise<StateVersion> {
    const endpoint = urljoin(
      '/workspaces/',
      encodeURI(workspaceId),
      '/current-state-version'
    );

    const response = await this.client.get(endpoint);
    return deserialize(response);
  }
}
