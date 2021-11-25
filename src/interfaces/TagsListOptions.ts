import { InlcudeRelatedResourcesOptions } from './InlcudeRelatedResourcesOptions';
import { ListOptions } from './ListOptions';

export interface TagsListOptions
  extends ListOptions,
    InlcudeRelatedResourcesOptions {
  // A search string (partial tag name) used to filter the results.
  'q'?: string;
}
