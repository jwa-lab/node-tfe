import axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';
import internal from 'stream';
import urljoin from 'url-join';
import { ConfigurationVersions } from './endpoints/configurationVersions';
import { Runs } from './endpoints/runs';
import { StateVersions } from './endpoints/stateVersions';
import { Tags } from './endpoints/tags';
import { Workspaces } from './endpoints/workspaces';
import { Types } from './enums/Types';
import { ResourceNotFoundError } from './errors/ResourceNotFoundError';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { WorkspaceLockError } from './errors/WorkspaceLockError';
import { Client as IClient } from './interfaces/Client';
import { Config } from './interfaces/Config';

const userAgent = 'node-tfe',
  // DefaultAddress of Terraform Enterprise.
  DefaultAddress = 'https://app.terraform.io',
  // DefaultBasePath on which the API is served.
  DefaultBasePath = '/api/v2/';

export class Client implements IClient {
  baseURL: string;
  token: string;
  HTTPClient: AxiosInstance;
  Workspaces: Workspaces;
  ConfigurationVersions: ConfigurationVersions;
  Runs: Runs;
  StateVersions: StateVersions;
  Tags: Tags;

  constructor(config: Config) {
    config.address =
      config.address || process.env.TFE_ADDRESS || DefaultAddress;
    config.basePath = config.basePath || DefaultBasePath;
    config.token = config.token || (process.env.TFE_TOKEN as string);

    if (!config.token) {
      throw new Error('missing API token');
    }

    this.baseURL = urljoin(config.address, config.basePath);
    this.token = config.token;
    this.HTTPClient = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: 'Bearer ' + this.token,
        'User-Agent': userAgent,
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
    });

    // Add a response interceptor
    this.HTTPClient.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error: AxiosError) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response?.status === 401) {
            throw new UnauthorizedError();
          }
          if (error.response?.status === 404) {
            let type;

            if (error.request.path.includes('/workspaces/')) {
              type = Types.workspace;
            }
            if (error.request.path.includes('/configuration-versions/')) {
              type = Types.configurationVersion;
            }
            if (error.request.path.includes('/runs/')) {
              type = Types.run;
            }
            if (error.request.path.includes('/current-state-version')) {
              type = Types.stateVersion;
            }
            if (error.request.path.includes('/tags')) {
              type = Types.tags;
            }
            throw new ResourceNotFoundError(type);
          }
          if (error.response?.status === 409) {
            throw new WorkspaceLockError();
          }
          throw new Error(JSON.stringify(error.response.data));
        }
        throw error;
      }
    );

    // ADD endpoints
    this.Workspaces = new Workspaces(this);
    this.ConfigurationVersions = new ConfigurationVersions(this);
    this.Runs = new Runs(this);
    this.StateVersions = new StateVersions(this);
    this.Tags = new Tags(this);
  }

  async get(path: string, params?: any): Promise<any> {
    const config = {
      url: path,
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/vnd.api+json',
      },
      params: params || {},
    };

    const response = await this.HTTPClient(config);

    // https://www.terraform.io/docs/cloud/api/index.html#json-api-documents
    return response.data;
  }

  async post(path: string, body?: any): Promise<any> {
    const config = {
      method: 'post' as const,
      url: path,
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      data: body,
    };

    const response = await this.HTTPClient(config);

    // https://www.terraform.io/docs/cloud/api/index.html#json-api-documents
    return response.data;
  }

  async put(path: string, body: internal.Readable): Promise<any> {
    const config = {
      method: 'put' as const,
      url: path,
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/octet-stream',
      },
      data: body,
    };

    const response = await this.HTTPClient(config);

    // https://www.terraform.io/docs/cloud/api/index.html#json-api-documents
    return response.data;
  }

  async patch(path: string, body?: any): Promise<any> {
    const config = {
      method: 'patch' as const,
      url: path,
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      data: body || {},
    };

    const response = await this.HTTPClient(config);

    // https://www.terraform.io/docs/cloud/api/index.html#json-api-documents
    return response.data;
  }

  async delete(path: string, body?: any): Promise<any> {
    const config = {
      method: 'delete' as const,
      url: path,
      headers: {
        Authorization: 'Bearer ' + this.token,
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      data: body
    };

    const response = await this.HTTPClient(config);

    // https://www.terraform.io/docs/cloud/api/index.html#json-api-documents
    return response.data;
  }
}
