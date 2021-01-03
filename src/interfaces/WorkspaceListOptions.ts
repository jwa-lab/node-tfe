import { InlcudeRelatedResourcesOptions } from './InlcudeRelatedResourcesOptions';
import { ListOptions } from './ListOptions';

export interface WorkspaceListOptions
  extends ListOptions,
    InlcudeRelatedResourcesOptions {
  // A search string (partial workspace name) used to filter the results.
  'search[name]'?: string;
}
