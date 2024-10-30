import type { NumberInString, Symbol as SymbolType } from '../types';
import type { OrderSide } from '../../enums';

/**
 * @interface ITrade
 * Interface representing a trade.
 *
 * @category Responses
 *
 * @property {`${number}_${number}`} id - The unique identifier of the trade, formatted as two numbers separated by an underscore.
 * @property {NumberInString} price - The price at which the trade was executed.
 * @property {NumberInString} base_amount - The amount of the base currency traded.
 * @property {NumberInString} quote_amount - The amount of the quote currency traded.
 * @property {OrderSide} side - The side of the trade, either 'buy' or 'sell'.
 *
 * @see [Trades](https://docs.bitpin.ir/v1/docs/market-data/matches)
 * @see {@link NumberInString}
 * @see {@link OrderSide}
 *
 * @example
 * const trade: ITrade = {
 *   id: "73802972_73807087",
 *   price: "1019000000",
 *   base_amount: "0.01086870",
 *   quote_amount: "11075213",
 *   side: "sell"
 * };
 */
export interface ITrade {
  id: `${number}_${number}`;
  price: NumberInString;
  base_amount: NumberInString;
  quote_amount: NumberInString;
  side: OrderSide;
}

/**
 * Interface representing the parameters for getting recent trades.
 *
 * @interface IGetRecentTradesParams
 *
 * @property {SymbolType} symbol - The symbol for which to get recent trades.
 *
 * @see [Trades](https://docs.bitpin.ir/v1/docs/market-data/matches)
 * @see {@link SymbolType}
 *
 * @example
 * const params: IGetRecentTradesParams = {
 *  symbol: "btcusdt"
 *  };
 */
export interface IGetRecentTradesParams {
  symbol: SymbolType;
}
