/**
 * @enum OrderState
 * Enum representing the order state.
 *
 * @category Enums
 *
 * @property {string} INITIAL - The initial state.
 * @property {string} ACTIVE - The active state.
 * @property {string} CLOSED - The closed state.
 *
 * @example
 * console.log(OrderState.INITIAL); // 'initial'
 * console.log(OrderState.ACTIVE); // 'active'
 * console.log(OrderState.CLOSED); // 'closed'
 */
export const OrderState = {
  INITIAL: 'initial',
  ACTIVE: 'active',
  CLOSED: 'closed',
} as const;

/**
 * @type OrderState
 * Type representing the order state.
 *
 * @category Types
 *
 * @example
 * const initial: OrderState = 'initial'; // 'initial'
 * const active: OrderState = 'active'; // 'active'
 * const closed: OrderState = 'closed'; // 'closed'
 * const invalid: OrderState = 'invalid'; // Error
 */
export type OrderState = (typeof OrderState)[keyof typeof OrderState];
