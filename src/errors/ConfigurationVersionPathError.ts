import { NodeTfeError } from './NodeTfeError';

export class ConfigurationVersionPathError extends NodeTfeError {
  constructor() {
    super('path needs to be an existing directory');

    // Set the prototype explicitly to avoid https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ConfigurationVersionPathError.prototype);
  }
}
