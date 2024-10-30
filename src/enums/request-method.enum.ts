/**
 * Enum representing the HTTP request methods.
 *
 * @enum RequestMethod
 *
 * @property {string} GET - GET request method
 * @property {string} POST - POST request method
 * @property {string} DELETE - DELETE request method
 *
 * @example
 * console.log(RequestMethod.GET); // 'get'
 * console.log(RequestMethod.POST); // 'post'
 * console.log(RequestMethod.DELETE); // 'delete'
 */
export const RequestMethod = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
} as const;

/**
 * @type RequestMethod
 * Type representing the HTTP request methods
 *
 * @category Types
 *
 * @example
 * const getRequest: RequestMethod = 'get'; // 'get'
 * const postRequest: RequestMethod = 'post'; // 'post'
 * const deleteRequest: RequestMethod = 'delete'; // 'delete'
 * const invalidRequest: RequestMethod = 'invalid'; // Error
 */
export type RequestMethod = (typeof RequestMethod)[keyof typeof RequestMethod];
