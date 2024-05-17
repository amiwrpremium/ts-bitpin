import { PriceInfo } from './price-info.interface';

export interface CurrenciesList {
  id: number;
  title: string;
  title_fa: string;
  code: string;
  image: string;
  min_withdraw: string;
  price_info: PriceInfo | Record<string, never>;
  price_info_usdt: PriceInfo | Record<string, never>;
  color: string;
  withdraw_commission: any;
  withdraw_commission_type: string;
  max_withdraw_commission: string;
  tradable: boolean;
  for_test: boolean;
  decimal: number;
  decimal_amount: number;
  decimal_irt: number;
  high_risk: boolean;
  show_high_risk: boolean;
}
