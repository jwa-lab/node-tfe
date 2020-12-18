import { ApplyStatus } from '../enums/ApplyStatus';
import { ApplyStatusTimestamps } from './ApplyStatusTimestamps';

export interface Apply {
  id: string; // `jsonapi:"primary,applies"`
  logReadURL: string; // `jsonapi:"attr,log-read-url"`
  resourceAdditions: number; //    `jsonapi:"attr,resource-additions"`
  resourceChanges: number; //    `jsonapi:"attr,resource-changes"`
  resourceDestructions: number; //    `jsonapi:"attr,resource-destructions"`
  status: ApplyStatus; // `jsonapi:"attr,status"`
  statusTimestamps: ApplyStatusTimestamps; // `jsonapi:"attr,status-timestamps"`
}
