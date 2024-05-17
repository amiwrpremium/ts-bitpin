import { OrderType } from '../../enums';

export interface GetOrderBookParams {
  market: number;
  type: OrderType;
}
