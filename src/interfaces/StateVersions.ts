import { StateVersion } from './StateVersion';
import { StateVersionCurrentOptions } from './StateVersionCurrentOptions';

export interface StateVersions {
  // Current reads the latest available state from the given workspace.
  current(workspaceId: string): Promise<StateVersion>;

  // CurrentWithOptions reads the latest available state from the given workspace using the options supplied
  currentWithOptions(
    workspaceId: string,
    options: StateVersionCurrentOptions
  ): Promise<StateVersion>;
}
