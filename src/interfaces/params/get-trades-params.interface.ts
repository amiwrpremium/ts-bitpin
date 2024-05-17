import { OrderType } from '../../enums';

export interface GetTradesParams {
  market?: string | number;
  type?: OrderType;
  page?: number;
}
