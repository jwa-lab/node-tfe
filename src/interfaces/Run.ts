import { Apply } from './Apply';
import { ConfigurationVersion } from './ConfigurationVersion';
import { Plan } from './Plan';
import { RunActions } from './RunActions';
import { RunPermissions } from './RunPermissions';
import { RunSource } from './RunSource';
import { RunStatus } from './RunStatus';
import { RunStatusTimestamps } from './RunStatusTimestamps';
import { Workspace } from './Workspace';

export interface Run {
  id: string;
  actions: RunActions; //     `jsonapi:"attr,actions"`
  createdAt: Date; //            `jsonapi:"attr,created-at,iso8601"`
  forceCancelAvailableAt: Date; //            `jsonapi:"attr,force-cancel-available-at,iso8601"`
  hasChanges: boolean; //              `jsonapi:"attr,has-changes"`
  isDestroy: boolean; //                 `jsonapi:"attr,is-destroy"`
  message: string; //          `jsonapi:"attr,message"`
  permissions: RunPermissions; //   `jsonapi:"attr,permissions"`
  positionInQueue: number; //                  `jsonapi:"attr,position-in-queue"`
  source: RunSource; //     `jsonapi:"attr,source"`
  status: RunStatus; //     `jsonapi:"attr,status"`
  statusTimestamps: RunStatusTimestamps; //`jsonapi:"attr,status-timestamps"`
  targetAddrs: string[]; //      `jsonapi:"attr,target-addrs,omitempty"`

  // Relations
  apply: Apply; //     `jsonapi:"relation,apply"`
  configurationVersion: ConfigurationVersion; // `jsonapi:"relation,configuration-version"`
  Plan: Plan; //           `jsonapi:"relation,plan"`
  Workspace: Workspace; //       `jsonapi:"relation,workspace"`
}
