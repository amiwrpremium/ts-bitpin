import { IPagination } from '../others';
import { Symbol as SymbolType, NumberInString, Timestamp } from '../types';
import { OrderSide } from '../../enums';

/**
 * @interface IFill
 * Interface representing a fill in an order book.
 *
 * @category Responses
 *
 * @property {string} id - The unique identifier of the fill.
 * @property {SymbolType} symbol - The symbol of the market.
 * @property {NumberInString} base_amount - The amount of the base currency.
 * @property {NumberInString} quote_amount - The amount of the quote currency.
 * @property {NumberInString} price - The price at which the fill was executed.
 * @property {Timestamp} created_at - The timestamp when the fill was created.
 * @property {NumberInString} commission - The commission for the fill.
 * @property {OrderSide} side - The side of the fill (buy or sell).
 * @property {string} commission_currency - The currency in which the commission is paid.
 * @property {number} order_id - The identifier of the order associated with the fill.
 * @property {string | null} identifier - The identifier for the fill, if applicable.
 *
 * @see [Fills](https://docs.bitpin.ir/v1/docs/order/get_fills_list)
 * @see {@link SymbolType}
 * @see {@link NumberInString}
 * @see {@link Timestamp}
 * @see {@link OrderSide}
 *
 * @example
 * const fill: IFill = {
 *   id: "65375307",
 *   symbol: "PIXFI_IRT",
 *   base_amount: "63.0",
 *   quote_amount: "123417",
 *   price: "1959",
 *   created_at: "2024-07-29T14:07:34.534824+03:30",
 *   commission: "0",
 *   side: "sell",
 *   commission_currency: "IRT",
 *   order_id: 535179385,
 *   identifier: null
 * };
 */
export interface IFill {
  id: string;
  symbol: SymbolType;
  base_amount: NumberInString;
  quote_amount: NumberInString;
  price: NumberInString;
  created_at: Timestamp;
  commission: NumberInString;
  side: OrderSide;
  commission_currency: string;
  order_id: number;
  identifier: string | null;
}

/**
 * @interface IGetFillsParams
 * Interface representing the parameters for querying fills.
 *
 * @category Parameters
 *
 * @property {SymbolType} symbol - The symbol of the market to filter the fills.
 * @property {OrderSide} side - The side of the order (buy or sell) to filter the fills.
 *
 * @extends IPagination
 *
 * @see [Fills](https://docs.bitpin.ir/v1/docs/order/get_fills_list)
 * @see {@link SymbolType}
 * @see {@link OrderSide}
 *
 * @example
 * const getFillsParams: IGetFillsParams = {
 *   symbol: "PIXFI_IRT",
 *   side: "buy",
 *   offset: 0,
 *   limit: 10
 * };
 */
export interface IGetFillsParams extends IPagination {
  symbol?: SymbolType;
  side?: OrderSide;
}

/**
 * @interface ICancelOrderParams
 * Interface representing the parameters for canceling an order.
 *
 * @category Parameters
 *
 * @property {string} order_id - The unique identifier of the order to be canceled.
 *
 * @example
 * const cancelOrderParams: ICancelOrderParams = {
 *   order_id: "123456789"
 * };
 */
export interface ICancelOrderParams {
  order_id: string;
}
