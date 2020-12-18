import { AxiosInstance } from 'axios';
import internal from 'stream';
import { Workspaces } from '../endpoints/workspaces';
import { ConfigurationVersions } from './ConfigurationVersions';
import { Runs } from './Runs';
import { StateVersions } from './StateVersions';

export interface Client {
  baseURL: string;
  token: string;
  HTTPClient: AxiosInstance;
  get<T>(path: string, params?: any): Promise<T>;
  post<T>(path: string, body?: any): Promise<T>;
  put<T>(path: string, body: internal.Readable): Promise<any>;
  patch(path: string, body?: any): Promise<any>;
  delete(path: string): Promise<any>;
  Workspaces: Workspaces;
  ConfigurationVersions: ConfigurationVersions;
  Runs: Runs;
  StateVerions: StateVersions;
}
