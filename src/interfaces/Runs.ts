// TFE API docs: https://www.terraform.io/docs/enterprise/api/workspaces.html

import { ListOptions } from './ListOptions';
import { Run } from './Run';
import { RunApplyOptions } from './RunApplyOptions';
import { RunCancelOptions } from './RunCancelOptions';
import { RunCreateOptions } from './RunCreateOptions';
import { RunDiscardOptions } from './RunDiscardOptions';
import { RunForceCancelOptions } from './RunForceCancelOptions';
import { RunList } from './RunList';

export interface Runs {
  // List all the runs of the given workspace.
  list(workspaceId: string, options: ListOptions): Promise<RunList>;

  // Create a new run with the given options.
  create(options: RunCreateOptions): Promise<Run>;

  // Read a run by its ID.
  read(runId: string): Promise<Run>;

  // Apply a run by its ID.
  apply(runId: string, options: RunApplyOptions): Promise<void>;

  // Cancel a run by its ID.
  cancel(runId: string, options: RunCancelOptions): Promise<void>;

  // Cancel a run by its ID.
  forceCancel(runId: string, options: RunForceCancelOptions): Promise<void>;

  // Discard a run by its ID.
  discard(runId: string, options: RunDiscardOptions): Promise<void>;
}
