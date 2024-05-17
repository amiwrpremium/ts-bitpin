import { Currency } from './currency.interface';
import { Commissions } from './commissions.interface';

export interface Market {
  id: number;
  currency1: Currency;
  currency2: Currency;
  code: string;
  title: string;
  title_fa: string;
  commissions: Commissions;
}
