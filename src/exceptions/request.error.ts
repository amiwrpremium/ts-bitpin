/**
 * Class representing a request error.
 *
 * @extends Error
 */
export class RequestError extends Error {
  /**
   * Returns a string representation of the RequestError.
   *
   * @returns {string} A string describing the error.
   *
   * @example
   * const error = new RequestError('Something went wrong');
   * console.log(error.toString()); // "RequestError: Something went wrong"
   */
  toString(): string {
    return `RequestError: ${this.message}`;
  }
}
