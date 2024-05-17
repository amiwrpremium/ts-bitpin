export const OrderState = {
  INITIAL: 'initial',
  ACTIVE: 'active',
  CLOSED: 'closed',
} as const;

export type OrderState = (typeof OrderState)[keyof typeof OrderState];
