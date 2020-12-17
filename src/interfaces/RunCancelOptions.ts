import { Serializer } from 'jsonapi-serializer';

export interface RunCancelOptions {
  // An optional comment about the run.
  comment: string; // `json:"comment,omitempty"`
}

export const RunCancelOptionsSerializer = new Serializer('runs', {
  attributes: ['comment'],
});
