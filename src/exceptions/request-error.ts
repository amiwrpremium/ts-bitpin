export class RequestError extends Error {
  toString(): string {
    return `RequestError: ${this.message}`;
  }
}
