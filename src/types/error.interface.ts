/**
 * Interface representing an error response.
 *
 * @interface IErrorResponse
 * Interface representing an error response.
 *
 * @property {string} detail - Detailed message about the error.
 * @property {string} [code] - Optional error code.
 * @property {{ [key: string]: string }[]} [messages] - Optional array of messages providing additional information about the error. Each message is represented as a key-value pair.
 *
 * @see [Error Response](https://docs.bitpin.ir/v1/docs/Request_&_Responses/Error_Response)
 *
 * @example
 * const errorResponse: IErrorResponse =
 * {
 *     "detail": "Given token not valid for any token type",
 *     "code": "token_not_valid",
 *     "messages": [
 *         {
 *             "token_class": "AccessToken",
 *             "token_type": "access",
 *             "message": "Token is invalid or expired"
 *         }
 *     ]
 * };
 */
export interface IErrorResponse {
  detail: string;
  code?: string;
  messages?: { [key: string]: string }[];
}
