/**
 * @interface ICancelOrderParams
 * Interface representing parameters for canceling an order.
 *
 * @category Parameters
 *
 * @property {string} order_id - The unique identifier of the order to be canceled.
 *
 * @see [Cancel Order](https://docs.bitpin.ir/v1/docs/trading/cancel-order)
 *
 * @example
 * const params: ICancelOrderParams = {
 *   order_id: "12345"
 * };
 */
export interface ICancelOrderParams {
  order_id: string;
}
