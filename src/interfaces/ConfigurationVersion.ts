import { ConfigurationSource } from '../enums/ConfigurationSource';
import { ConfigurationStatus } from '../enums/ConfigurationStatus';
import { CVStatusTimestamps } from './ConfigurationVersionsStatusTimestamps';

export interface ConfigurationVersion {
  id: string; //      `jsonapi:"primary,configuration-versions"`
  autoQueueRuns: boolean; //          `jsonapi:"attr,auto-queue-runs"`
  error: string; //          `jsonapi:"attr,error"`
  errorMessage: string; //       `jsonapi:"attr,error-message"`
  source: ConfigurationSource; // `jsonapi:"attr,source"`
  speculative: boolean; //      `jsonapi:"attr,speculative "`
  status: ConfigurationStatus; // `jsonapi:"attr,status"`
  statusTimestamps: CVStatusTimestamps; // `jsonapi:"attr,status-timestamps"`
  uploadUrl: string; //       `jsonapi:"attr,upload-url"`
}
