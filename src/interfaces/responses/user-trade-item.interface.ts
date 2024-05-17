import { Market } from './market.interface';

export interface UserTradeItem {
  id: number;
  exchanged1: string;
  exchanged2: string;
  price: string;
  market: Market;
  created_at: string;
  type: string;
  commission: string;
  user_type: string;
  user_gain: string;
  user_order_id: number;
}
