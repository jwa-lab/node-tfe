import { Serializer } from 'jsonapi-serializer';

export interface RunDiscardOptions {
  // An optional comment about the run.
  comment: string; // `json:"comment,omitempty"`
}

export const RunDiscardOptionsSerializer = new Serializer('runs', {
  attributes: ['comment'],
});
