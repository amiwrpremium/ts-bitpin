import { AxiosResponse } from 'axios';

/**
 * Class representing an API error.
 *
 * @extends Error
 */
export class APIError extends Error {
  /**
   * Creates an instance of APIError.
   *
   * @param {number} code - The error code.
   * @param {string} message - The error message.
   * @param {AxiosResponse | undefined} response - The Axios response associated with the error.
   *
   * @example
   * const error = new APIError(404, 'Not Found', response);
   */
  constructor(
    readonly code: number,
    readonly message: string,
    readonly response: AxiosResponse | undefined,
  ) {
    super();
  }

  /**
   * Returns a string representation of the APIError.
   *
   * @returns {string} A string describing the error.
   *
   * @example
   * const error = new APIError(404, 'Not Found', response);
   * console.log(error.toString()); // "APIError(code=404): Not Found"
   */
  toString(): string {
    return `APIError(code=${this.code}): ${this.message}`;
  }
}
