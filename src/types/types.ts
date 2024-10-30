/**
 * @type NumberInString
 * Represents a number in string format.
 *
 * @category Types
 *
 * @example
 * const number: NumberInString = '123'; // '123'
 * const invalid: NumberInString = 123; // Error
 */
export type NumberInString = `${number}`;

/**
 * @type Timestamp
 * Represents a timestamp in string format.
 *
 * @category Types
 *
 * @example
 * const timestamp: Timestamp = '2021-01-01T00:00:00.000+00:00'; // '2021-01-01T00:00:00.000+00:00'
 * const invalid: Timestamp = '2021-01-01T00-00:00.000+00:00'; // Error
 */
export type Timestamp =
  `${number}-${number}-${number}T${number}:${number}:${number}.${number}+${number}:${number}`;

/**
 * @type IRT
 * Represents the Iranian Rial currency.
 *
 * @category Types
 *
 * @example
 * const irt: IRT = 'IRT'; // 'IRT'
 * const invalid: IRT = 'USDT'; // Error
 */
export type IRT = 'IRT';

/**
 * @type USDT
 * Represents the Tether currency.
 *
 * @category Types
 *
 * @example
 * const usdt: USDT = 'USDT'; // 'USDT'
 * const invalid: USDT = 'IRT'; // Error
 */
export type USDT = 'USDT';

/**
 * @type QuoteCurrency
 * Represents the quote currency.
 *
 * @category Types
 *
 * @example
 * const irt: QuoteCurrency = 'IRT'; // 'IRT'
 * const usdt: QuoteCurrency = 'USDT'; // 'USDT'
 * const invalid: QuoteCurrency = 'invalid'; // Error
 */
export type QuoteCurrency = IRT | USDT;

/**
 * @type Toman
 * Represents the Toman currency.
 *
 * @category Types
 *
 * @example
 * const toman: Toman = 'Toman'; // 'Toman'
 * const invalid: Toman = 'IRT'; // Error
 */
export type Toman = 'Toman';

/**
 * @type Tether
 * Represents the Tether currency.
 *
 * @category Types
 *
 * @example
 * const tether: Tether = 'Tether'; // 'Tether'
 * const invalid: Tether = 'USDT'; // Error
 */
export type Tether = 'Tether';

/**
 * @type QuoteCurrencyName
 * Represents the name of the quote currency.
 *
 * @category Types
 *
 * @example
 * const toman: QuoteCurrencyName = 'Toman'; // 'Toman'
 * const tether: QuoteCurrencyName = 'Tether'; // 'Tether'
 * const invalid: QuoteCurrencyName = 'invalid'; // Error
 */
export type QuoteCurrencyName = Toman | Tether;

/**
 * @type Symbol
 * Represents the symbol of a market.
 *
 * @category Types
 *
 * @example
 * const symbol: Symbol = 'symbol_USDT'; // 'symbol_USDT'
 * const invalid: Symbol = 'symbol/IRT'; // Error
 */
export type Symbol = `${string}_${QuoteCurrency}`;

/**
 * @type MarketName
 * Represents the name of a market.
 *
 * @category Types
 *
 * @example
 * const marketName: MarketName = 'symbol/USDT'; // 'symbol/USDT'
 * const invalid: MarketName = 'symbol_IRT'; // Error
 */
export type MarketName = `${string}/${QuoteCurrencyName}`;

/**
 * @type TLD
 * Represents a top-level domain.
 *
 * @category Types
 *
 * @example
 * const iranTLD: TLD = 'ir'; // 'ir'
 * const orgTLD: TLD = 'org'; // 'org'
 * const invalidTLD: TLD = 'com'; // Error
 */
export type TLD = 'ir' | 'org';
