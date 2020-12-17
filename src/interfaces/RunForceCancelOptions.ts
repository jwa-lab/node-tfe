import { Serializer } from 'jsonapi-serializer';

export interface RunForceCancelOptions {
  // An optional comment about the run.
  comment: string; // `json:"comment,omitempty"`
}

export const RunForceCancelOptionsSerializer = new Serializer('runs', {
  attributes: ['comment'],
});
