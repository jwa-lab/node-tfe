import { AxiosInstance } from 'axios';
import { Workspaces } from '../workspaces';

export interface Client {
  baseURL: string;
  token: string;
  HTTPClient: AxiosInstance;
  get<T>(path: string, params?: any): Promise<T>;
  Workspaces: Workspaces;
}
