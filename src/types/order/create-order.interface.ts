import { Symbol as SymbolType } from '../types';
import { OrderSide, OrderType } from '../../enums';

/**
 * @interface PriceMixin
 * Interface representing a mixin for price.
 *
 * @property {number} price - The price value.
 */
export interface PriceMixin {
  price: number;
}

/**
 * @interface StopPriceMixin
 * Interface representing a mixin for stop price.
 *
 * @extends PriceMixin
 *
 * @property {number} stop_price - The stop price value.
 */
export interface StopPriceMixin extends PriceMixin {
  stop_price: number;
}

/**
 * @interface BaseCreateOrderParams
 * Interface representing the base parameters for creating an order.
 *
 * @property {SymbolType} symbol - The symbol for the order.
 * @property {OrderType} type - The type of the order.
 * @property {OrderSide} side - The side of the order (buy/sell).
 * @property {number} base_amount - The base amount for the order.
 */
export interface BaseCreateOrderParams {
  symbol: SymbolType;
  type: OrderType;
  side: OrderSide;
  base_amount: number;
}

/**
 * @interface CreateLimitOrderParams
 * Interface representing the parameters for creating a limit order.
 *
 * @extends BaseCreateOrderParams, PriceMixin
 *
 * @property {'limit'} type - The type of the order (limit).
 *
 * @example
 * const createLimitOrderParams: CreateLimitOrderParams = {
 *   symbol: 'BTC_USDT',
 *   type: OrderType.LIMIT,
 *   side: OrderSide.BUY,
 *   base_amount: 1,
 *   price: 50000,
 * }
 */
export interface CreateLimitOrderParams
  extends BaseCreateOrderParams,
    PriceMixin {
  type: 'limit';
}

/**
 * @interface CreateMarketOrderParams
 * Interface representing the parameters for creating a market order.
 *
 * @extends BaseCreateOrderParams
 *
 * @property {'market'} type - The type of the order (market).
 *
 * @example
 * const createMarketOrderParams: CreateMarketOrderParams = {
 *   symbol: 'BTC_USDT',
 *   type: OrderType.MARKET,
 *   side: OrderSide.BUY,
 *   base_amount: 1,
 * }
 */
export interface CreateMarketOrderParams extends BaseCreateOrderParams {
  type: 'market';
}

/**
 * @interface CreateStopLimitOrderParams
 * Interface representing the parameters for creating a stop limit order.
 *
 * @extends BaseCreateOrderParams, StopPriceMixin
 *
 * @property {'stop_limit'} type - The type of the order (stop limit).
 *
 * @example
 * const createStopLimitOrderParams: CreateStopLimitOrderParams = {
 *   symbol: 'BTC_USDT',
 *   type: OrderType.STOP_LIMIT,
 *   side: OrderSide.BUY,
 *   base_amount: 1,
 *   price: 50000,
 *   stop_price: 49000,
 * }
 */
export interface CreateStopLimitOrderParams
  extends BaseCreateOrderParams,
    StopPriceMixin {
  type: 'stop_limit';
}

/**
 * @interface CreateOCOOrderParams
 * Interface representing the parameters for creating an OCO (One Cancels the Other) order.
 *
 * @extends BaseCreateOrderParams, StopPriceMixin
 *
 * @property {'oco'} type - The type of the order (OCO).
 * @property {number} oco_target_price - The target price for the OCO order.
 *
 * @example
 * const createOCOOrderParams: CreateOCOOrderParams = {
 *   symbol: 'BTC_USDT',
 *   type: OrderType.OCO,
 *   side: OrderSide.BUY,
 *   base_amount: 1,
 *   price: 50000,
 *   stop_price: 49000,
 *   oco_target_price: 51000,
 * }
 */
export interface CreateOCOOrderParams
  extends BaseCreateOrderParams,
    StopPriceMixin {
  type: 'oco';
  oco_target_price: number;
}

/**
 * @type CreateOrderParams
 * Type representing the parameters for creating an order.
 * It can be one of the following types:
 * - CreateLimitOrderParams
 * - CreateMarketOrderParams
 * - CreateStopLimitOrderParams
 * - CreateOCOOrderParams
 *
 * @see {@link CreateLimitOrderParams}
 * @see {@link CreateMarketOrderParams}
 * @see {@link CreateStopLimitOrderParams}
 * @see {@link CreateOCOOrderParams}
 */
export type CreateOrderParams =
  | CreateLimitOrderParams
  | CreateMarketOrderParams
  | CreateStopLimitOrderParams
  | CreateOCOOrderParams;
