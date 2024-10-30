/**
 * @interface IPagination
 * Interface representing pagination parameters.
 *
 * @category Parameters
 *
 * @property {number} [offset] - The number of items to skip before starting to collect the result set.
 * @property {number} [limit] - The number of items to return.
 *
 * @example
 * const pagination: IPagination = {
 *   offset: 10,
 *   limit: 20
 * };
 */
export interface IPagination {
  offset?: number;
  limit?: number;
}
