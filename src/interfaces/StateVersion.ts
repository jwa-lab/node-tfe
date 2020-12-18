// Workspace represents a Terraform Enterprise workspace.

import { Run } from './Run';
import { StateVersionOutput } from './StateVersionOutput';

export interface StateVersion {
  id: string; //  `jsonapi:"primary,state-versions"`
  createdAt: Date; //  `jsonapi:"attr,created-at,iso8601"`
  downloadURL: string; //  `jsonapi:"attr,hosted-state-download-url"`
  serial: number; //   `jsonapi:"attr,serial"`
  vcsCommitSHA: string; //  `jsonapi:"attr,vcs-commit-sha"`
  vcsCommitURL: string; //  `jsonapi:"attr,vcs-commit-url"`

  // Relations
  run: Run; //        `jsonapi:"relation,run"`
  outputs: StateVersionOutput[]; // `jsonapi:"relation,outputs"`
}
