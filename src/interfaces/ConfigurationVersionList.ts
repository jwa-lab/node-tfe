import { ConfigurationVersion } from './ConfigurationVersion';
import { Pagination } from './Pagination';
export interface ConfigurationVersionList {
  pagination: Pagination;
  items: ConfigurationVersion[];
}
