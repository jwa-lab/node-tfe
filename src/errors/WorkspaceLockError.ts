import { NodeTfeError } from './NodeTfeError';

export class WorkspaceLockError extends NodeTfeError {
  constructor() {
    super(
      'Conflict: either ErrWorkspaceLocked | ErrWorkspaceNotLocked | ErrWorkspaceNotLocked'
    );

    // Set the prototype explicitly to avoid https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, WorkspaceLockError.prototype);
  }
}
