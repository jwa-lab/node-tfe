import { PlanStatus } from './PlanStatus';
import { PlanStatusTimestamps } from './PlanStatusTimestamps';

export interface Plan {
  id: string;
  hasChanges: boolean; //    `jsonapi:"attr,has-changes"`
  logReadURL: string; //  `jsonapi:"attr,log-read-url"`
  resourceAdditions: number; //     `jsonapi:"attr,resource-additions"`
  resourceChanges: number; //     `jsonapi:"attr,resource-changes"`
  resourceDestructions: number; //     `jsonapi:"attr,resource-destructions"`
  status: PlanStatus; //  `jsonapi:"attr,status"`
  statusTimestamps: PlanStatusTimestamps; // `jsonapi:"attr,status-timestamps"`
}
