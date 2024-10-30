import type { NumberInString } from '../types';

/**
 * @interface ICurrencyInfo
 * Interface representing information about a currency.
 *
 * @category Responses
 *
 * @property {string} currency - The code of the currency.
 * @property {string} name - The name of the currency.
 * @property {boolean} tradable - Indicates if the currency is tradable.
 * @property {NumberInString} precision - The precision of the currency.
 *
 * @see [Currencies Information](https://docs.bitpin.ir/v1/docs/market-data/currencies)
 * @see {@link NumberInString}
 *
 * @example
 * const currencyInfo: ICurrencyInfo = {
 *   currency: "IRT",
 *   name: "Toman",
 *   tradable: true,
 *   precision: "0"
 * };
 */
export interface ICurrencyInfo {
  currency: string;
  name: string;
  tradable: boolean;
  precision: NumberInString;
}
