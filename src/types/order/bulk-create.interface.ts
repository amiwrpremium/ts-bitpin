import { IOrderStatusResponse } from './order-status.interface';

/**
 * @interface IBulkCreateOrderResponse
 * Interface representing a bulk order creation response.
 *
 * @category Responses
 *
 * @see [Bulk Create Order](https://docs.bitpin.ir/v1/docs/order/Bulk%20Orders/Place_Bulk_Orders)
 * @see {@link IOrderStatusResponse}
 *
 * @property {IOrderStatusResponse[]} orders - Array of order statuses.
 *
 * @example
 * const bulkCreateOrder: IBulkCreateOrder = {
 *   orders: [
 *     {
 *       id: 535179385,
 *       symbol: "PIXFI_IRT",
 *       type: "limit",
 *       side: "sell",
 *       price: "1956",
 *       stop_price: null,
 *       oco_target_price: null,
 *       base_amount: "63.0",
 *       quote_amount: "123228",
 *       identifier: null,
 *       state: "active",
 *       closed_at: null,
 *       created_at: "2024-07-29T14:07:34.176795+03:30",
 *       dealed_base_amount: "0",
 *       dealed_quote_amount: "0",
 *       req_to_cancel: false,
 *       commission: "1000"
 *     },
 *     {
 *       id: 535179255,
 *       symbol: "PIXFI_IRT",
 *       type: "limit",
 *       side: "sell",
 *       price: "2000",
 *       stop_price: null,
 *       oco_target_price: null,
 *       base_amount: "80.0",
 *       quote_amount: "160000",
 *       identifier: null,
 *       state: "active",
 *       closed_at: null,
 *       created_at: "2024-07-29T14:07:34.176795+03:30",
 *       dealed_base_amount: "0",
 *       dealed_quote_amount: "0",
 *       req_to_cancel: false,
 *       commission: "1000"
 *     }
 *   ]
 * };
 */
export interface IBulkCreateOrderResponse {
  orders: IOrderStatusResponse[];
}
