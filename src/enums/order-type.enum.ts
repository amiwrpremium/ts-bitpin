export const OrderType = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

export type OrderType = (typeof OrderType)[keyof typeof OrderType];
