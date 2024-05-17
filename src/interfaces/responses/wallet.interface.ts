import { Currency } from './currency.interface';

export interface Wallet {
  id: number;
  currency: Currency;
  balance: string;
  frozen: string;
  total: string;
  value: string;
  value_frozen: string;
  value_total: string;
  usdt_value: string;
  usdt_value_frozen: string;
  usdt_value_total: string;
  address: string;
  inviter_commission: string;
  daily_withdraw: string;
  remaining_daily_withdraw: string;
}
