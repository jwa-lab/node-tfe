import { Serializer } from 'jsonapi-serializer';
export interface RunApplyOptions {
  // An optional comment about the run.
  comment: string; // `json:"comment,omitempty"`
}

export const RunApplyOptionsSerializer = new Serializer('runs', {
  attributes: ['comment'],
});
