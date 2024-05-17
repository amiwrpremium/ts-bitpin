import { Tag } from './tag.interface';

export interface Currency {
  id: number;
  title: string;
  title_fa: string;
  code: string;
  tradable: boolean;
  for_test: boolean;
  image: string;
  decimal: number;
  decimal_amount: number;
  decimal_irt: number;
  color: string;
  high_risk: boolean;
  show_high_risk: boolean;
  withdraw_commission: string;
  tags?: Tag[];
  etf?: boolean;
  for_binvest?: boolean;
  for_loan?: boolean;
  for_stake?: boolean;
  recommend_for_deposit_weight?: number;
}
