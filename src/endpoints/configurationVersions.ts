import fs from 'fs/promises';
import tar from 'tar';
import urljoin from 'url-join';
import { ConfigurationVersionPathError } from '../errors/ConfigurationVersionPathError';
import { ConfigurationVersion } from '../interfaces/ConfigurationVersion';
import {
  ConfigurationVersionCreateOptions,
  ConfigurationVersionCreateOptionsSerializer,
} from '../interfaces/ConfigurationVersionCreateOptions';
import { ConfigurationVersionList } from '../interfaces/ConfigurationVersionList';
import { ConfigurationVersions as IConfigurationVersions } from '../interfaces/ConfigurationVersions';
import { ListOptions } from '../interfaces/ListOptions';
import { Client } from '../tfe';
import { deserializer } from '../utils/deserializer';
import { parsePagination } from '../utils/parsePagination';

export class ConfigurationVersions implements IConfigurationVersions {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async list(
    workspaceId: string,
    options: ListOptions = {}
  ): Promise<ConfigurationVersionList> {
    const endpoint = urljoin(
      '/workspaces/',
      encodeURI(workspaceId),
      '/configuration-versions'
    );
    const response = await this.client.get(endpoint, options);

    const configurationVersionList = {
      pagination: parsePagination(response.meta.pagination),
      items: await deserializer(response),
    };
    return configurationVersionList;
  }

  async create(
    workspaceId: string,
    options: ConfigurationVersionCreateOptions = {}
  ): Promise<ConfigurationVersion> {
    const endpoint = urljoin(
      '/workspaces/',
      encodeURI(workspaceId),
      '/configuration-versions'
    );
    const serializedOptions = await ConfigurationVersionCreateOptionsSerializer.serialize(
      options
    );

    const response = await this.client.post(endpoint, serializedOptions);
    return deserializer(response);
  }

  async read(cvId: string): Promise<ConfigurationVersion> {
    const endpoint = urljoin('/configuration-versions/', encodeURI(cvId));
    const response = await this.client.get(endpoint);
    return deserializer(response);
  }

  async upload(url: string, path: string): Promise<void> {
    const stats = await fs.stat(path);

    if (!stats.isDirectory()) {
      throw new ConfigurationVersionPathError();
    }
    // TODO add error handler
    const readStream = tar.create(
      {
        C: path,
        gzip: true,
      },
      ['.']
    );
    await this.client.put(url, readStream);
  }
}
