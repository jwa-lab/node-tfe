import axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';
import urljoin from 'url-join';
import { Client as IClient } from './interfaces/Client';
import { Config } from './interfaces/Config';
import { Workspaces } from './workspaces';

const userAgent = 'node-tfe',
  headerRateLimit = 'X-RateLimit-Limit',
  headerRateReset = 'X-RateLimit-Reset',
  headerAPIVersion = 'TFP-API-Version',
  // DefaultAddress of Terraform Enterprise.
  DefaultAddress = 'https://app.terraform.io',
  // DefaultBasePath on which the API is served.
  DefaultBasePath = '/api/v2/',
  // PingEndpoint is a no-op API endpoint used to configure the rate limiter
  PingEndpoint = 'ping';

export class Client implements IClient {
  baseURL: string;
  token: string;
  HTTPClient: AxiosInstance;
  Workspaces: Workspaces;

  constructor(config: Config) {
    config.Address =
      config.Address || process.env.TFE_ADDRESS || DefaultAddress;
    config.BasePath = config.BasePath || DefaultBasePath;
    config.Token = config.Token || (process.env.TFE_TOKEN as string);

    if (!config.Token) {
      throw new Error('missing API token');
    }

    this.baseURL = urljoin(config.Address, config.BasePath);
    this.token = config.Token;
    this.HTTPClient = axios.create({
      baseURL: this.baseURL,
      headers: { Authorization: 'Bearer ' + this.token },
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
            throw new Error('Unauthorized');
          }
          if (error.response?.status === 404) {
            throw new Error('Resource not found');
          }
          if (error.response?.status === 409) {
            throw new Error(
              'Conflict: either ErrWorkspaceLocked | ErrWorkspaceNotLocked | ErrWorkspaceNotLocked'
            );
          }
          throw new Error(JSON.stringify(error.response.data));
        }
        throw error;
      }
    );
    this.Workspaces = new Workspaces(this);
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
      data: body || {},
    };

    const response = await this.HTTPClient(config);

    // https://www.terraform.io/docs/cloud/api/index.html#json-api-documents
    return response.data;
  }
}
