export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');

    // Set the prototype explicitly to avoid https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
