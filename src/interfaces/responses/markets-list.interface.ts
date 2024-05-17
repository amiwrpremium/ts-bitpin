import { Currency } from './currency.interface';
import { PriceInfo } from './price-info.interface';

export interface MarketsList {
  id: number;
  currency1: Currency;
  currency2: Currency;
  tradable: boolean;
  for_test: boolean;
  otc_sell_percent: string;
  otc_buy_percent: string;
  otc_max_buy_amount: string;
  otc_max_sell_amount: string;
  order_book_info: PriceInfo | Record<string, never>;
  internal_price_info: PriceInfo | Record<string, never>;
  price_info: PriceInfo | Record<string, never>;
  price: string;
  title: string;
  code: string;
  title_fa: string;
  trading_view_source: string;
  otc_market: boolean;
}
