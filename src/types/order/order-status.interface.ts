import type { Symbol as SymbolType, NumberInString } from '../types';
import { OrderSide, OrderState, OrderType } from '../../enums';
import { IPagination } from '../others';

/**
 * @interface IOrderStatusResponse
 * Interface representing the creation of an order.
 *
 * @category Responses
 *
 * @property {SymbolType} symbol - The symbol of the market.
 * @property {OrderType} type - The type of the order (e.g., limit, market).
 * @property {OrderSide} side - The side of the order (buy or sell).
 * @property {NumberInString} price - The price at which the order is placed.
 * @property {NumberInString | null} stop_price - The stop price for the order, if applicable.
 * @property {NumberInString | null} oco_target_price - The OCO target price for the order, if applicable.
 * @property {NumberInString} base_amount - The amount of the base currency.
 * @property {NumberInString} quote_amount - The amount of the quote currency.
 * @property {string | null} identifier - The identifier for the order, if applicable.
 * @property {OrderState} state - The current state of the order.
 * @property {string | null} closed_at - The timestamp when the order was closed, if applicable.
 * @property {string} created_at - The timestamp when the order was created.
 * @property {NumberInString} dealed_base_amount - The amount of the base currency that has been dealt.
 * @property {NumberInString} dealed_quote_amount - The amount of the quote currency that has been dealt.
 * @property {false} req_to_cancel - Indicates if there is a request to cancel the order.
 * @property {NumberInString} commission - The commission for the order.
 *
 * @see [Create Order](https://docs.bitpin.ir/v1/docs/order/place_order)
 * @see [Create Limit Order](https://docs.bitpin.ir/v1/docs/order/Order%20Types/limit_order)
 * @see [Create Market Order](https://docs.bitpin.ir/v1/docs/order/Order%20Types/market)
 * @see [Create Stop Limit Order](https://docs.bitpin.ir/v1/docs/order/Order%20Types/stop_limit_order)
 * @see [Create OCO Order](https://docs.bitpin.ir/v1/docs/order/Order%20Types/oco)
 * @see {@link OrderType}
 * @see {@link OrderSide}
 * @see {@link OrderState}
 * @see {@link SymbolType}
 * @see {@link NumberInString}
 *
 * @example
 * const order: ICreateOrder = {
 *   symbol: "PIXFI_IRT",
 *   type: "limit",
 *   side: "sell",
 *   price: "1956",
 *   stop_price: null,
 *   oco_target_price: null,
 *   base_amount: "63.0",
 *   quote_amount: "123228",
 *   identifier: null,
 *   state: "active",
 *   closed_at: null,
 *   created_at: "2024-07-29T14:07:34.176795+03:30",
 *   dealed_base_amount: "0",
 *   dealed_quote_amount: "0",
 *   req_to_cancel: false,
 *   commission: "1000"
 * };
 */
export interface IOrderStatusResponse {
  symbol: SymbolType;
  type: OrderType;
  side: OrderSide;
  price: NumberInString;
  stop_price: NumberInString | null;
  oco_target_price: NumberInString | null;
  base_amount: NumberInString;
  quote_amount: NumberInString;
  identifier: string | null;
  state: OrderState;
  closed_at: string | null;
  created_at: string;
  dealed_base_amount: NumberInString;
  dealed_quote_amount: NumberInString;
  req_to_cancel: false;
  commission: NumberInString;
}

/**
 * @interface IGetOpenOrdersParams
 * Interface representing the parameters for querying open orders.
 *
 * @category Parameters
 *
 * @property {SymbolType} [symbol] - Optional symbol of the market to filter the orders.
 * @property {OrderSide} [side] - Optional side of the order (buy or sell) to filter the orders.
 * @property {OrderState} [state] - Optional state of the order to filter the orders.
 * @property {OrderType} [type] - Optional type of the order (e.g., limit, market) to filter the orders.
 * @property {string} [identifier] - Optional identifier for the order to filter the orders.
 * @property {Date} [start] - Optional start date to filter the orders.
 * @property {Date} [end] - Optional end date to filter the orders.
 * @property {string[]} [ids_in] - Optional array of order IDs to filter the orders.
 * @property {string[]} [identifiers_in] - Optional array of order identifiers to filter the orders.
 *
 * @extends IPagination
 *
 * @example
 * const getOpenOrdersParams: IGetOpenOrdersParams = {
 *   symbol: "PIXFI_IRT",
 *   side: "buy",
 *   state: "active",
 *   type: "limit",
 *   identifier: "order123",
 *   start: new Date("2024-01-01"),
 *   end: new Date("2024-12-31"),
 *   ids_in: ["id1", "id2"],
 *   identifiers_in: ["identifier1", "identifier2"],
 *   offset: 0,
 *   limit: 10
 * };
 */
export interface IGetOpenOrdersParams extends IPagination {
  symbol?: SymbolType;
  side?: OrderSide;
  state?: OrderState;
  type?: OrderType;
  identifier?: string;
  start?: Date;
  end?: Date;
  ids_in?: string[];
  identifiers_in?: string[];
}

/**
 * @interface IGetOrderStatusParams
 * Interface representing the parameters for getting the status of an order.
 *
 * @category Parameters
 *
 * @property {string | string[]} order_id - The unique identifier(s) of the order(s) to get the status for.
 *
 * @example
 * const getOrderStatusParams: IGetOrderStatusParams = {
 *   order_id: "123456789"
 * };
 *
 * @example
 * const getOrderStatusParams: IGetOrderStatusParams = {
 *   order_id: ["123456789", "987654321"]
 * };
 */
export interface IGetOrderStatusParams {
  order_id: string | string[];
}
