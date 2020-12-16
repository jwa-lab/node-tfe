import { Serializer } from 'jsonapi-serializer';

export interface ConfigurationVersionCreateOptions {
  // When true, runs are queued automatically when the configuration version
  // is uploaded.
  autoQueueRuns?: boolean; // `jsonapi:"attr,auto-queue-runs,omitempty"`

  // When true, this configuration version can only be used for planning.
  speculative?: boolean; // `jsonapi:"attr,speculative,omitempty"`
}

export const ConfigurationVersionCreateOptionsSerializer = new Serializer(
  'configuration-versions',
  {
    attributes: ['autoQueueRuns', 'speculative'],
  }
);
