export const OrderMode = {
  LIMIT: 'limit',
  MARKET: 'market',
  STOP_LIMIT: 'stop_limit',
  OCO: 'oco',
} as const;

export type OrderMode = (typeof OrderMode)[keyof typeof OrderMode];
