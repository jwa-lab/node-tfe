import { Types } from '../enums/Types';
import { NodeTfeError } from './NodeTfeError';

export class ResourceNotFoundError extends NodeTfeError {
  type?: Types;
  constructor(type?: Types) {
    super('Resource not found');
    this.type = type;
    // Set the prototype explicitly to avoid https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }
}
