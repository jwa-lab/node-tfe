import { InlcudeRelatedResourcesOptions } from './InlcudeRelatedResourcesOptions';
import { StateVersion } from './StateVersion';

export interface StateVersions {
  // Current reads the latest available state from the given workspace.
  current(workspaceId: string): Promise<StateVersion>;

  // CurrentWithOptions reads the latest available state from the given workspace using the options supplied
  currentWithOptions(
    workspaceId: string,
    options?: InlcudeRelatedResourcesOptions
  ): Promise<StateVersion>;
}
