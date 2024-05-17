import { OrderType } from '../../enums';

export interface TradeItem {
  time: number;
  price: string;
  value: string;
  match_amount: string;
  type: OrderType;
  match_id: string;
}
