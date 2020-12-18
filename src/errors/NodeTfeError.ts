export class NodeTfeError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly to avoid https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, NodeTfeError.prototype);
  }
}
