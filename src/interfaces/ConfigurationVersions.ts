// TFE API docs: https://www.terraform.io/docs/enterprise/api/workspaces.html

import { ConfigurationVersion } from './ConfigurationVersion';
import { ConfigurationVersionCreateOptions } from './ConfigurationVersionCreateOptions';
import { ConfigurationVersionList } from './ConfigurationVersionList';
import { ListOptions } from './ListOptions';

export interface ConfigurationVersions {
  // List returns all configuration versions of a workspace.
  list(
    workspaceId: string,
    options: ListOptions
  ): Promise<ConfigurationVersionList>;

  // Create is used to create a new configuration version. The created
  // configuration version will be usable once data is uploaded to it.
  create(
    workspaceId: string,
    options?: ConfigurationVersionCreateOptions
  ): Promise<ConfigurationVersion>;

  // Read a configuration version by its ID.
  read(cvId: string): Promise<ConfigurationVersion>;

  // Upload packages and uploads Terraform configuration files. It requires
  // the upload URL from a configuration version and the full path to the
  // configuration files on disk.
  upload(url: string, path: string): Promise<void>;
}
