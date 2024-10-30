/**
 * @interface IBulkCancelOrdersResponse
 * Interface representing the response of a bulk cancel orders operation.
 *
 * @category Responses
 *
 * @property {string[]} canceled_orders - Array of order IDs that were successfully canceled.
 * @property {string[]} not_canceled_orders - Array of order IDs that were not canceled.
 *
 * @see [Bulk Cancel Orders](https://docs.bitpin.ir/v1/docs/order/Bulk%20Orders/Cancel_Bulk_Orders)
 *
 * @example
 * const bulkCancelOrders: IBulkCancelOrders = {
 *   canceled_orders: ["abcd1", "abcd2"],
 *   not_canceled_orders: []
 * };
 */
export interface IBulkCancelOrdersResponse {
  canceled_orders: string[];
  not_canceled_orders: string[];
}

/**
 * @interface IBulkCancelOrdersParams
 * Interface representing the parameters required for a bulk cancel orders operation.
 *
 * @category Parameters
 *
 * @property {string[]} ids - Array of order IDs to be canceled.
 *
 * @see [Bulk Cancel Orders](https://docs.bitpin.ir/v1/docs/order/Bulk%20Orders/Cancel_Bulk_Orders)
 *
 * @example
 * const bulkCancelOrdersParams: IBulkCancelOrdersParams = {
 *   ids: ["abcd1", "abcd2", "abcd3"]
 * };
 */
export interface IBulkCancelOrdersParams {
  ids: string[];
}
