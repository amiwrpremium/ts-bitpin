/**
 * @enum OrderType
 * Enum representing the type of order
 *
 * @category Enums
 *
 * @property {string} LIMIT - Limit order
 * @property {string} MARKET - Market order
 * @property {string} STOP_LIMIT - Stop limit order
 * @property {string} OCO - One cancels the other order
 *
 * @example
 * console.log(OrderType.LIMIT); // 'limit'
 * console.log(OrderType.MARKET); // 'market'
 * console.log(OrderType.STOP_LIMIT); // 'stop_limit'
 * console.log(OrderType.OCO); // 'oco'
 */
export const OrderType = {
  LIMIT: 'limit',
  MARKET: 'market',
  STOP_LIMIT: 'stop_limit',
  OCO: 'oco',
} as const;

/**
 * @type OrderType
 * Type representing the type of order
 *
 * @category Types
 *
 * @example
 * const limit: OrderType = 'limit'; // 'limit'
 * const market: OrderType = 'market'; // 'market'
 * const stopLimit: OrderType = 'stop_limit'; // 'stop_limit'
 * const oco: OrderType = 'oco'; // 'oco'
 * const invalid: OrderType = 'invalid'; // Error
 */
export type OrderType = (typeof OrderType)[keyof typeof OrderType];
