export interface Level {
  id: number;
  title: string;
  required_score: number;
  order: number;
  income_percent_per_transaction: number;
  max_daily_withdraw: number;
}
