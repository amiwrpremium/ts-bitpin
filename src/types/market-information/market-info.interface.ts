import type {
  Symbol as SymbolType,
  MarketName,
  NumberInString,
  QuoteCurrency,
} from '../types';

/**
 * @interface IMarketInfo
 * Interface representing market information.
 *
 * @category Responses
 *
 * @property {SymbolType} symbol - The symbol of the market.
 * @property {MarketName} name - The name of the market.
 * @property {string} base - The base currency of the market.
 * @property {QuoteCurrency} quote - The quote currency of the market.
 * @property {boolean} tradable - Indicates if the market is tradable.
 * @property {NumberInString} price_precision - The price precision of the market.
 * @property {NumberInString} base_amount_precision - The base amount precision of the market.
 * @property {NumberInString} quote_amount_precision - The quote amount precision of the market.
 *
 * @see [Markets Information](https://docs.bitpin.ir/v1/docs/market-data/markets)
 * @see {@link SymbolType}
 * @see {@link MarketName}
 * @see {@link NumberInString}
 * @see {@link QuoteCurrency}
 *
 * @example
 * const marketInfo: IMarketInfo = {
 *   symbol: "BTC_IRT",
 *   name: "Bitcoin/Toman",
 *   base: "BTC",
 *   quote: "IRT",
 *   tradable: true,
 *   price_precision: "0",
 *   base_amount_precision: "8",
 *   quote_amount_precision: "0"
 * };
 */
export interface IMarketInfo {
  symbol: SymbolType;
  name: MarketName;
  base: string;
  quote: QuoteCurrency;
  tradable: boolean;
  price_precision: NumberInString;
  base_amount_precision: NumberInString;
  quote_amount_precision: NumberInString;
}
