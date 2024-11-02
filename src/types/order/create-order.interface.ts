import { Symbol as SymbolType } from '../types';
import { OrderSide, OrderType } from '../../enums';

/**
 * @interface IPriceMixin
 * Interface representing a mixin for price.
 *
 * @property {number} price - The price value.
 */
export interface IPriceMixin {
  price: number;
}

/**
 * @interface IStopPriceMixin
 * Interface representing a mixin for stop price.
 *
 * @extends IPriceMixin
 *
 * @property {number} stop_price - The stop price value.
 */
export interface IStopPriceMixin extends IPriceMixin {
  stop_price: number;
}

/**
 * @interface IBaseCreateOrderParams
 * Interface representing the base parameters for creating an order.
 *
 * @property {SymbolType} symbol - The symbol for the order.
 * @property {OrderType} type - The type of the order.
 * @property {OrderSide} side - The side of the order (buy/sell).
 * @property {number} base_amount - The base amount for the order.
 */
export interface IBaseCreateOrderParams {
  symbol: SymbolType;
  type: OrderType;
  side: OrderSide;
  base_amount: number;
}

/**
 * @interface ICreateLimitOrderParams
 * Interface representing the parameters for creating a limit order.
 *
 * @extends IBaseCreateOrderParams, IPriceMixin
 *
 * @property {'limit'} type - The type of the order (limit).
 *
 * @example
 * const createLimitOrderParams: ICreateLimitOrderParams = {
 *   symbol: 'BTC_USDT',
 *   type: OrderType.LIMIT,
 *   side: OrderSide.BUY,
 *   base_amount: 1,
 *   price: 50000,
 * }
 */
export interface ICreateLimitOrderParams
  extends IBaseCreateOrderParams,
    IPriceMixin {
  type: 'limit';
}

/**
 * @interface ICreateMarketOrderParams
 * Interface representing the parameters for creating a market order.
 *
 * @extends IBaseCreateOrderParams
 *
 * @property {'market'} type - The type of the order (market).
 *
 * @example
 * const createMarketOrderParams: ICreateMarketOrderParams = {
 *   symbol: 'BTC_USDT',
 *   type: OrderType.MARKET,
 *   side: OrderSide.BUY,
 *   base_amount: 1,
 * }
 */
export interface ICreateMarketOrderParams extends IBaseCreateOrderParams {
  type: 'market';
}

/**
 * @interface ICreateStopLimitOrderParams
 * Interface representing the parameters for creating a stop limit order.
 *
 * @extends IBaseCreateOrderParams, IStopPriceMixin
 *
 * @property {'stop_limit'} type - The type of the order (stop limit).
 *
 * @example
 * const createStopLimitOrderParams: ICreateStopLimitOrderParams = {
 *   symbol: 'BTC_USDT',
 *   type: OrderType.STOP_LIMIT,
 *   side: OrderSide.BUY,
 *   base_amount: 1,
 *   price: 50000,
 *   stop_price: 49000,
 * }
 */
export interface ICreateStopLimitOrderParams
  extends IBaseCreateOrderParams,
    IStopPriceMixin {
  type: 'stop_limit';
}

/**
 * @interface ICreateOCOOrderParams
 * Interface representing the parameters for creating an OCO (One Cancels the Other) order.
 *
 * @extends IBaseCreateOrderParams, IStopPriceMixin
 *
 * @property {'oco'} type - The type of the order (OCO).
 * @property {number} oco_target_price - The target price for the OCO order.
 *
 * @example
 * const createOCOOrderParams: ICreateOCOOrderParams = {
 *   symbol: 'BTC_USDT',
 *   type: OrderType.OCO,
 *   side: OrderSide.BUY,
 *   base_amount: 1,
 *   price: 50000,
 *   stop_price: 49000,
 *   oco_target_price: 51000,
 * }
 */
export interface ICreateOCOOrderParams
  extends IBaseCreateOrderParams,
    IStopPriceMixin {
  type: 'oco';
  oco_target_price: number;
}

/**
 * @type CreateOrderParams
 * Type representing the parameters for creating an order.
 * It can be one of the following types:
 * - ICreateLimitOrderParams
 * - ICreateMarketOrderParams
 * - ICreateStopLimitOrderParams
 * - ICreateOCOOrderParams
 *
 * @see {@link ICreateLimitOrderParams}
 * @see {@link ICreateMarketOrderParams}
 * @see {@link ICreateStopLimitOrderParams}
 * @see {@link ICreateOCOOrderParams}
 */
export type CreateOrderParams =
  | ICreateLimitOrderParams
  | ICreateMarketOrderParams
  | ICreateStopLimitOrderParams
  | ICreateOCOOrderParams;
