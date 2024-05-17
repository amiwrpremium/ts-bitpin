import { OrderMode, OrderType } from '../../enums';

export interface GenericCreateOrder {
  market: string | number;
  identifier?: string;
  mode: OrderMode;
  type: OrderType;
  price: string | number;
  amount1?: string | number;
  amount2?: string | number;
}

export interface CreateOrderWithAmount1Interface extends GenericCreateOrder {
  amount1: string | number;
}

export interface CreateOrderWithAmount2Interface extends GenericCreateOrder {
  amount2: string | number;
}

export interface CreateLimitOrderInterface extends GenericCreateOrder {
  mode: 'limit';
  price_limit: string | number;
}

export interface CreateStopLimitOrderInterface extends GenericCreateOrder {
  mode: 'stop_limit';
  price_stop: string | number;
  price_limit: string | number;
}

export interface CreateOCOOrderInterface extends GenericCreateOrder {
  mode: 'oco';
  price_stop: string | number;
  price_limit: string | number;
  price_limit_oco: string | number;
}

export type CreateOrderParams =
  | CreateLimitOrderInterface
  | CreateStopLimitOrderInterface
  | CreateOCOOrderInterface
  | CreateOrderWithAmount1Interface
  | CreateOrderWithAmount2Interface;
