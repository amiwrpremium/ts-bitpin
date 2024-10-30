import type { NumberInString, Symbol as SymbolType } from '../types';

/**
 * @interface IOrderBookResponse
 * Interface representing an order book.
 *
 * @property {Array<[NumberInString, NumberInString]>} asks - Array of ask orders, each represented by a tuple containing price and amount.
 * @property {Array<[NumberInString, NumberInString]>} bids - Array of bid orders, each represented by a tuple containing price and amount.
 *
 * @category Responses
 *
 * @see [Order Book](https://docs.bitpin.ir/v1/docs/market-data/orderbook)
 * @see {@link NumberInString}
 *
 * @example
 * const orderBook: IOrderBook = {
 *   asks: [
 *     ["51000", "2000.00000000"],
 *     ["52000", "2000.00000000"],
 *     ["52500", "1000.00000000"]
 *   ],
 *   bids: [
 *     ["50000", "1000.00000000"],
 *     ["49500", "1000.00000000"],
 *     ["49000", "1000.00000000"]
 *   ]
 * };
 */
export interface IOrderBookResponse {
  asks: [NumberInString, NumberInString][];
  bids: [NumberInString, NumberInString][];
}

/**
 * Interface representing parameters for getting the order book.
 *
 * @interface IGetOrderBookParams
 *
 * @category Parameters
 *
 * @property {SymbolType} symbol - The symbol for which to get the order book.
 *
 * @see [Order Book](https://docs.bitpin.ir/v1/docs/market-data/orderbook)
 * @see {@link SymbolType}
 *
 * @example
 * const params: IGetOrderBookParams = {
 *  symbol: "BTC_IRT"
 * };
 */
export interface IGetOrderBookParams {
  symbol: SymbolType;
}
