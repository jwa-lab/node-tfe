// Workspace represents a Terraform Enterprise workspace.

import { HostedStateResource } from './HostedStateResource';
import { Run } from './Run';
import { StateVersionOutput } from './StateVersionOutput';

export interface StateVersion {
  id: string; //  `jsonapi:"primary,state-versions"`
  createdAt: Date; //  `jsonapi:"attr,created-at,iso8601"`
  hostedStateDownloadUrl: string; //  `jsonapi:"attr,hosted-state-download-url"`
  serial: number; //   `jsonapi:"attr,serial"`
  vcsCommitSHA: string; //  `jsonapi:"attr,vcs-commit-sha"`
  vcsCommitURL: string; //  `jsonapi:"attr,vcs-commit-url"`
  resources?: HostedStateResource[];
  // Relations
  run: Run; //        `jsonapi:"relation,run"`
  outputs: StateVersionOutput[]; // `jsonapi:"relation,outputs"`
}
