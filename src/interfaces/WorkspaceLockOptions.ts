import { Serializer } from 'jsonapi-serializer';

export interface WorkspaceLockOptions {
  // Specifies the reason for locking the workspace.
  reason?: string; // `json:"reason,omitempty"`
}

export const WorkspaceLockOptionsSerializer = new Serializer('workspaces', {
  attributes: ['reason'],
});
