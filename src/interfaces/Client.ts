import { AxiosInstance } from 'axios';
import { Workspaces } from '../workspaces';
import { ConfigurationVersions } from './ConfigurationVersions';

export interface Client {
  baseURL: string;
  token: string;
  HTTPClient: AxiosInstance;
  get<T>(path: string, params?: any): Promise<T>;
  Workspaces: Workspaces;
  ConfigurationVersions: ConfigurationVersions;
}
