/**
 * @enum OrderSide
 * Enum representing the order side.
 *
 * @category Enums
 *
 * @property {string} BUY - The buy side.
 * @property {string} SELL - The sell side.
 *
 * @example
 * console.log(OrderSide.BUY); // 'buy'
 * console.log(OrderSide.SELL); // 'sell'
 */
export const OrderSide = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

/**
 * @type OrderSide
 * Type representing the order side.
 *
 * @category Types
 *
 * @example
 * const buy: OrderSide = 'buy'; // 'buy'
 * const sell: OrderSide = 'sell'; // 'sell'
 * const invalid: OrderSide = 'invalid'; // Error
 */
export type OrderSide = (typeof OrderSide)[keyof typeof OrderSide];
