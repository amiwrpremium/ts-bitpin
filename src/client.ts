import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';

import * as t from './types';
import { RequestMethod } from './enums';
import { APIError, RequestError } from './exceptions';
import { IRefreshTokenParams } from './types';

/**
 * Represents a client for interacting with the Bitpin API.
 */
export class Client {
  /**
   * The API key for authentication.
   * @protected
   * @type {string | undefined}
   */
  protected apiKey: string | undefined;

  /**
   * The secret key for authentication.
   * @protected
   * @type {string | undefined}
   */
  protected secretKey: string | undefined;

  /**
   * The refresh token for obtaining new access tokens.
   * @protected
   * @type {string | undefined}
   */
  protected refreshToken: string | undefined;

  /**
   * The access token for authenticated requests.
   * @protected
   * @type {string | undefined}
   */
  protected accessToken: string | undefined;

  /**
   * Background processes configuration.
   * @protected
   * @type {t.IBackgroundProcesses | undefined}
   */
  protected backgroundProcess: t.IBackgroundProcesses | undefined;

  /**
   * Custom Axios configuration.
   * @protected
   * @type {AxiosRequestConfig | undefined}
   */
  protected axiosConfig: AxiosRequestConfig | undefined;

  /**
   * The top-level domain for the API base URL.
   * @protected
   * @type {t.TLD}
   * @default 'ir'
   */
  protected tld: t.TLD = 'ir';

  /**
   * The base URL for the API.
   * @public
   * @type {string}
   * @default 'https://api.bitpin.{tld}'
   */
  public baseUrl: string = 'https://api.bitpin.{tld}/api';

  /**
   * The API version to use.
   * @public
   * @type {string}
   * @default 'v1'
   */
  public apiVersion1: string = 'v1';

  /**
   * The Axios instance for making HTTP requests.
   * @protected
   * @type {AxiosInstance}
   */
  protected session: AxiosInstance;

  /**
   * The request timeout in milliseconds.
   * @protected
   * @type {number}
   * @default 5000
   */
  protected requestTimeout: number = 5_000;

  /**
   * Initializes a new instance of the Client class with the provided parameters.
   *
   * @param {t.IClientParams} [params] - Optional parameters for initializing the client.
   */
  constructor(params?: t.IClientParams) {
    this.apiKey = params?.apiKey;
    this.secretKey = params?.secretKey;
    this.refreshToken = params?.refreshToken;
    this.accessToken = params?.accessToken;
    this.backgroundProcess = params?.backgroundProcess;
    this.axiosConfig = params?.axiosConfig;
    this.tld = params?.tld || 'ir';

    this.session = axios.create(this.getAxiosConfig());
  }

  /**
   * Creates a new instance of the Client class and authenticates if API key and secret key are provided.
   *
   * @param {t.IClientParams} [params] - Optional parameters for creating the client instance.
   * @returns {Promise<Client>} A promise that resolves to a new Client instance.
   *
   * @example
   * const client = await Client.Create({ apiKey: 'your_api_key', secretKey: 'your_secret_key' });
   */
  public static async Create(params?: t.IClientParams): Promise<Client> {
    const client = new Client(params);
    if (client.apiKey && client.secretKey) {
      await client.authenticate();
    }
    return client;
  }

  // ---------------------------------------- [Utility Methods] ---------------------------------------- //

  /**
   * Configures and returns the Axios request configuration.
   *
   * @protected
   * @returns {AxiosRequestConfig} The Axios request configuration with default headers.
   */
  protected getAxiosConfig(): AxiosRequestConfig {
    const config: AxiosRequestConfig = this.axiosConfig || {};
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return config;
  }

  /**
   * Creates the full API URI by combining the base URL, version, and path.
   *
   * @protected
   * @param {string} path - The endpoint path.
   * @param {string} [version=this.apiVersion1] - The API version to use.
   * @returns {string} The full API URI.
   *
   * @example
   * const uri = this.createApiUri('endpoint');
   * console.log(uri); // 'https://api.bitpin.ir/v1/endpoint'
   */
  protected createApiUri(
    path: string,
    version: string = this.apiVersion1,
  ): string {
    return `${this.baseUrl.replace('{tld}', this.tld)}/${version}/${path}`;
  }

  /**
   * Configures and returns the Axios request configuration with the necessary headers and parameters.
   *
   * @protected
   * @param {string} method - The HTTP request method (e.g., 'get', 'post').
   * @param {boolean} signed - Indicates if the request requires authentication.
   * @param {t.IRequestOptions} [kwargs={}] - Additional request options.
   * @returns {AxiosRequestConfig} The configured Axios request configuration.
   *
   * @throws {Error} If the request requires authentication but the access token is not available.
   *
   * @example
   * const config = this.getRequestKwargs('get', true, { data: { key: 'value' } });
   * console.log(config);
   */
  protected getRequestKwargs(
    method: string,
    signed: boolean,
    kwargs: t.IRequestOptions = {},
  ): AxiosRequestConfig {
    kwargs.timeout = kwargs.timeout || this.requestTimeout;

    const data = kwargs['data'];
    if (data && typeof data === 'object') {
      kwargs['data'] = data;

      if ('requests_params' in kwargs['data']) {
        kwargs = { ...kwargs, ...kwargs['data']['requests_params'] };
        delete kwargs['data']['requests_params'];
      }
    }

    if (signed) {
      if (!this.accessToken) {
        throw new Error('Access token is required for signed requests');
      }
      const headers: any = kwargs['headers'] || {};
      headers['Authorization'] = `Bearer ${this.accessToken}`;
      kwargs['headers'] = headers;
    }

    if (data && method === 'get') {
      kwargs['params'] = data;
      delete kwargs['data'];
    }

    return kwargs;
  }

  // ---------------------------------------- [Request Methods] ---------------------------------------- //

  /**
   * Makes an HTTP request using Axios and handles errors.
   *
   * @private
   * @template R
   * @param {string} method - The HTTP request method (e.g., 'get', 'post').
   * @param {string} uri - The endpoint URI.
   * @param {boolean} [signed=false] - Indicates if the request requires authentication.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<R>} A promise that resolves to the response data.
   *
   * @throws {APIError} If the request receives an error response from the server.
   * @throws {RequestError} If no response is received or there is an error making the request.
   *
   * @example
   * const data = await this.request('get', '/endpoint', true, { params: { key: 'value' } });
   * console.log(data);
   */
  private async request<R>(
    method: string,
    uri: string,
    signed: boolean = false,
    kwargs?: t.IRequestOptions,
  ): Promise<R> {
    const requestConfig = this.getRequestKwargs(method, signed, kwargs);

    try {
      return (
        await this.session.request({ method, url: uri, ...requestConfig })
      ).data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          throw new APIError(
            error.response.status,
            error.response.data.detail,
            error.response,
          );
        } else if (error.request) {
          throw new RequestError(`No response received from Bitpin`);
        } else {
          throw new RequestError(`Error making request to Bitpin`);
        }
      } else {
        throw error;
      }
    }
  }

  /**
   * Makes an API request using the specified HTTP method, path, and other options.
   *
   * @private
   * @template R
   * @param {string} method - The HTTP request method (e.g., 'get', 'post').
   * @param {string} path - The endpoint path.
   * @param {boolean} [signed=false] - Indicates if the request requires authentication.
   * @param {string} [version=this.apiVersion1] - The API version to use.
   * @param {object} [kwargs={}] - Additional request options.
   * @returns {Promise<R>} A promise that resolves to the response data.
   *
   * @example
   * const data = await this.requestAPI('get', 'endpoint', true);
   * console.log(data);
   */
  private async requestAPI<R>(
    method: string,
    path: string,
    signed: boolean = false,
    version: string = this.apiVersion1,
    { ...kwargs }: any = {},
  ): Promise<R> {
    const uri = this.createApiUri(path, version);
    return await this.request<R>(method, uri, signed, kwargs);
  }

  /**
   * Makes a GET request to the specified API endpoint.
   *
   * @protected
   * @template R
   * @param {string} path - The endpoint path.
   * @param {boolean} [signed=false] - Indicates if the request requires authentication.
   * @param {string} [version=this.apiVersion1] - The API version to use.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<R>} A promise that resolves to the response data.
   *
   * @example
   * const data = await this.get('endpoint', true);
   * console.log(data);
   */
  protected async get<R>(
    path: string,
    signed: boolean = false,
    version: string = this.apiVersion1,
    kwargs?: t.IRequestOptions,
  ): Promise<R> {
    return await this.requestAPI<R>(
      RequestMethod.GET,
      path,
      signed,
      version,
      kwargs,
    );
  }

  /**
   * Makes a POST request to the specified API endpoint.
   *
   * @protected
   * @template R
   * @param {string} path - The endpoint path.
   * @param {boolean} [signed=false] - Indicates if the request requires authentication.
   * @param {string} [version=this.apiVersion1] - The API version to use.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<R>} A promise that resolves to the response data.
   *
   * @example
   * const data = await this.post('endpoint', true);
   * console.log(data);
   */
  protected async post<R>(
    path: string,
    signed: boolean = false,
    version: string = this.apiVersion1,
    kwargs?: t.IRequestOptions,
  ): Promise<R> {
    return await this.requestAPI<R>(
      RequestMethod.POST,
      path,
      signed,
      version,
      kwargs,
    );
  }

  /**
   * Makes a DELETE request to the specified API endpoint.
   *
   * @protected
   * @template R
   * @param {string} path - The endpoint path.
   * @param {boolean} [signed=false] - Indicates if the request requires authentication.
   * @param {string} [version=this.apiVersion1] - The API version to use.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<any>} A promise that resolves to the response data.
   *
   * @example
   * const data = await this.delete('endpoint', true);
   * console.log(data);
   */
  protected async delete<R>(
    path: string,
    signed: boolean = false,
    version: string = this.apiVersion1,
    kwargs?: t.IRequestOptions,
  ): Promise<any> {
    return await this.requestAPI<R>(
      RequestMethod.DELETE,
      path,
      signed,
      version,
      kwargs,
    );
  }

  // ---------------------------------------- [usr] --------------------------------

  /**
   * Authenticates the client using the provided API key and secret key.
   *
   * @public
   * @param {t.IAuthenticationParams} [params] - Optional authentication parameters.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IAuthenticateResponse>} A promise that resolves to the authentication response.
   *
   * @throws {Error} If the API key or secret key is not provided.
   *
   * @example
   * const response = await client.authenticate({ apiKey: 'your_api_key', secretKey: 'your_secret_key' });
   * console.log(response);
   */
  public async authenticate(
    params?: t.IAuthenticationParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IAuthenticateResponse> {
    const apiKey = params?.apiKey || this.apiKey;
    const secretKey = params?.secretKey || this.secretKey;

    if (!apiKey || !secretKey) {
      throw new Error('API key and secret key are required for login'); // TODO: Custom Error
    }
    const result = await this.post<t.IAuthenticateResponse>(
      'usr/authenticate/',
      false,
      this.apiVersion1,
      {
        data: {
          api_key: this.apiKey,
          secret_key: this.secretKey,
        },
        ...kwargs,
      },
    );

    // Set the refresh and access tokens
    this.refreshToken = result.refresh;
    this.accessToken = result.access;

    return result;
  }

  /**
   * Refreshes the access token using the provided refresh token or the stored refresh token.
   *
   * @public
   * @param {IRefreshTokenParams} [params] - Optional parameters containing the refresh token.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IRefreshTokenResponse>} A promise that resolves to the refresh token response.
   *
   * @throws {Error} If the refresh token is not provided.
   *
   * @example
   * const response = await client.refreshAccessToken({ refresh: 'your_refresh_token' });
   * console.log(response);
   */
  public async refreshAccessToken(
    params?: IRefreshTokenParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IRefreshTokenResponse> {
    const refreshToken = params?.refresh || this.refreshToken;

    if (!refreshToken) {
      throw new Error('Refresh token is required for refreshing access token'); // TODO: Custom Error
    }

    const result = await this.post<t.IRefreshTokenResponse>(
      'usr/refresh_token/',
      false,
      this.apiVersion1,
      {
        ...(kwargs || {}),
        data: { refresh: refreshToken },
      },
    );

    // Update the access token
    this.accessToken = result.access;

    return result;
  }

  // ---------------------------------------- [mkt] ---------------------------------------- //

  /**
   * Retrieves the list of available currencies.
   *
   * @public
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.ICurrencyInfo[]>} A promise that resolves to an array of currency information.
   *
   * @example
   * const currencies = await client.getCurrenciesList();
   * console.log(currencies);
   */
  public async getCurrenciesList(
    kwargs?: t.IRequestOptions,
  ): Promise<t.ICurrencyInfo[]> {
    return await this.get<t.ICurrencyInfo[]>(
      'mkt/currencies/',
      false,
      this.apiVersion1,
      kwargs,
    );
  }

  /**
   * Retrieves the list of available markets.
   *
   * @public
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IMarketInfo[]>} A promise that resolves to an array of market information.
   *
   * @example
   * const markets = await client.getMarketsInfo();
   * console.log(markets);
   */
  public async getMarketsInfo(
    kwargs?: t.IRequestOptions,
  ): Promise<t.IMarketInfo[]> {
    return await this.get<t.IMarketInfo[]>(
      'mkt/markets/',
      false,
      this.apiVersion1,
      kwargs,
    );
  }

  /**
   * Retrieves the list of price tickers.
   *
   * @public
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.ITickerInfo[]>} A promise that resolves to an array of ticker information.
   *
   * @example
   * const tickers = await client.getPriceTickers();
   * console.log(tickers);
   */
  public async getPriceTickers(
    kwargs?: t.IRequestOptions,
  ): Promise<t.ITickerInfo[]> {
    return await this.get<t.ITickerInfo[]>(
      'mkt/tickers/',
      false,
      this.apiVersion1,
      kwargs,
    );
  }

  // ---------------------------------------- [mth] ---------------------------------------- //

  /**
   * Retrieves the order book for the specified symbol.
   *
   * @public
   * @param {t.IGetOrderBookParams} params - Parameters containing the symbol for which to retrieve the order book.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IOrderBookResponse>} A promise that resolves to the order book response.
   *
   * @example
   * const orderBook = await client.getOrderBook({ symbol: 'BTC_USD' });
   * console.log(orderBook);
   */
  public async getOrderBook(
    params: t.IGetOrderBookParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IOrderBookResponse> {
    return await this.get<t.IOrderBookResponse>(
      `mth/orderbook/${params.symbol}/`,
      false,
      this.apiVersion1,
      kwargs,
    );
  }

  /**
   * Retrieves the recent trades for the specified symbol.
   *
   * @public
   * @param {t.IGetRecentTradesParams} params - Parameters containing the symbol for which to retrieve recent trades.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.ITrade[]>} A promise that resolves to an array of trade information.
   *
   * @example
   * const recentTrades = await client.getRecentTrades({ symbol: 'BTC_USD' });
   * console.log(recentTrades);
   */
  public async getRecentTrades(
    params: t.IGetRecentTradesParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.ITrade[]> {
    return await this.get<t.ITrade[]>(
      `mth/matches/${params.symbol}/`,
      false,
      this.apiVersion1,
      kwargs,
    );
  }

  // ---------------------------------------- [wlt] ---------------------------------------- //

  /**
   * Retrieves the wallet information.
   *
   * @public
   * @param {t.IGetWalletsParams} [params] - Optional parameters for retrieving wallet information.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IWalletResponse[]>} A promise that resolves to an array of wallet responses.
   *
   * @example
   * const wallets = await client.getWallet();
   * console.log(wallets);
   */
  public async getWallet(
    params?: t.IGetWalletsParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IWalletResponse[]> {
    return await this.get('wlt/wallets/', true, this.apiVersion1, {
      ...kwargs,
      params,
    });
  }

  // ---------------------------------------- [odr] ---------------------------------------- //

  /**
   * Creates a new order.
   *
   * @public
   * @param {t.CreateOrderParams} params - Parameters for creating the order.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IOrderStatusResponse>} A promise that resolves to the order status response.
   *
   * @example
   * const orderStatus = await client.createOrder({ symbol: 'BTC_USD', amount: 1 });
   * console.log(orderStatus);
   */
  public async createOrder(
    params: t.CreateOrderParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IOrderStatusResponse> {
    return await this.post<t.IOrderStatusResponse>(
      'odr/orders/',
      true,
      this.apiVersion1,
      {
        data: params,
        ...kwargs,
      },
    );
  }

  /**
   * Retrieves the list of open orders.
   *
   * @public
   * @param {t.IGetOpenOrdersParams} [params] - Optional parameters for retrieving open orders.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IOrderStatusResponse[]>} A promise that resolves to an array of order status responses.
   *
   * @example
   * const openOrders = await client.getOpenOrders();
   * console.log(openOrders);
   */
  public async getUserOrders(
    params?: t.IGetOpenOrdersParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IOrderStatusResponse[]> {
    return await this.get<t.IOrderStatusResponse[]>(
      `odr/orders/`,
      true,
      this.apiVersion1,
      {
        data: params,
        ...kwargs,
      },
    );
  }

  /**
   * Cancels an order with the specified order ID.
   *
   * @public
   * @param {t.ICancelOrderParams} params - Parameters containing the order ID to cancel.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IOrderStatusResponse>} A promise that resolves to the order status response.
   *
   * @example
   * const response = await client.cancelOrder({ order_id: '12345' });
   * console.log(response);
   */
  public async cancelOrder(
    params: t.ICancelOrderParams,
    kwargs?: t.IRequestOptions,
  ): Promise<undefined> {
    return await this.delete<undefined>(
      `odr/orders/${params.order_id}/`,
      true,
      this.apiVersion1,
      kwargs,
    );
  }

  /**
   * Retrieves the status of an order with the specified order ID(s).
   *
   * @public
   * @param {t.IGetOrderStatusParams} params - Parameters containing the order ID(s) to retrieve the status for.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IOrderStatusResponse>} A promise that resolves to the order status response.
   *
   * @example
   * const status = await client.getOrderStatus({ order_id: '12345' });
   * console.log(status);
   */
  public async getOrderStatus(
    params: t.IGetOrderStatusParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IOrderStatusResponse> {
    const param = Array.isArray(params.order_id)
      ? params.order_id.join(',')
      : params.order_id;
    return await this.get<t.IOrderStatusResponse>(
      `odr/orders/${param}/`,
      true,
      this.apiVersion1,
      kwargs,
    );
  }

  /**
   * Retrieves the user's trade history.
   *
   * @public
   * @param {t.IGetFillsParams} [params] - Optional parameters for retrieving the trade history.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IFill[]>} A promise that resolves to an array of trade information.
   *
   * @example
   * const trades = await client.getUserTrades();
   * console.log(trades);
   */
  public async getUserTrades(
    params?: t.IGetFillsParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IFill[]> {
    return await this.get<t.IFill[]>('odr/fills/', true, this.apiVersion1, {
      data: params,
      ...kwargs,
    });
  }

  /**
   * Creates multiple orders in bulk.
   *
   * @public
   * @param {t.CreateOrderParams[]} params - An array of parameters for creating the orders.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IBulkCreateOrderResponse>} A promise that resolves to the bulk create order response.
   *
   * @example
   * const response = await client.bulkCreateOrders([{ symbol: 'BTC_USD', amount: 1 }]);
   * console.log(response);
   */
  public async bulkCreateOrders(
    params: t.CreateOrderParams[],
    kwargs?: t.IRequestOptions,
  ): Promise<t.IBulkCreateOrderResponse> {
    return await this.post<t.IBulkCreateOrderResponse>(
      'odr/orders/bulk/',
      true,
      this.apiVersion1,
      {
        data: params,
        ...kwargs,
      },
    );
  }

  /**
   * Cancels multiple orders in bulk.
   *
   * @public
   * @param {t.IBulkCancelOrdersParams} params - An array of parameters for canceling the orders.
   * @param {t.IRequestOptions} [kwargs] - Additional request options.
   * @returns {Promise<t.IBulkCancelOrdersResponse>} A promise that resolves to the bulk cancel order response.
   *
   * @example
   * const response = await client.bulkCancelOrders([{ order_id: '12345' }]);
   * console.log(response);
   */
  public async bulkCancelOrders(
    params: t.IBulkCancelOrdersParams,
    kwargs?: t.IRequestOptions,
  ): Promise<t.IBulkCancelOrdersResponse> {
    return await this.post<t.IBulkCancelOrdersResponse>(
      'odr/orders/bulk/',
      true,
      this.apiVersion1,
      {
        data: params,
        ...kwargs,
      },
    );
  }
}
