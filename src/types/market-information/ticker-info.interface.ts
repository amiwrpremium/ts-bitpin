import type { Symbol as SymbolType, NumberInString } from '../types';

/**
 * @interface ITickerInfo
 * Interface representing ticker information for a market.
 *
 * @category Responses
 *
 * @property {SymbolType} symbol - The symbol of the market.
 * @property {NumberInString} price - The current price of the market.
 * @property {number} daily_change_price - The daily change in price.
 * @property {NumberInString} low - The lowest price of the market for the day.
 * @property {NumberInString} high - The highest price of the market for the day.
 * @property {number} timestamp - The timestamp of the ticker information.
 *
 * @see [Price Information](https://docs.bitpin.ir/v1/docs/market-data/tickers)
 * @see {@link SymbolType}
 * @see {@link NumberInString}
 *
 * @example
 * const tickerInfo: ITickerInfo = {
 *   symbol: "BTC_IRT",
 *   price: "3145737420",
 *   daily_change_price: -15.58,
 *   low: "3035557311",
 *   high: "3745700550",
 *   timestamp: 1722860054.189
 * };
 */
export interface ITickerInfo {
  symbol: SymbolType;
  price: NumberInString;
  daily_change_price: number;
  low: NumberInString;
  high: NumberInString;
  timestamp: number;
}
