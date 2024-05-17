import { OrderState, OrderType, OrderMode } from '../../enums';

export interface GetOpenOrdersParams {
  market?: string;
  state?: OrderState;
  type?: OrderType;
  mode?: OrderMode;
  identifier?: string;
}
