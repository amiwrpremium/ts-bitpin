import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';

import * as t from './interfaces';
import { RequestMethod } from './enums';
import { APIError, APIErrorDetailed, RequestError } from './exceptions';

export class Client {
  protected apiKey: string | undefined;
  protected secretKey: string | undefined;
  protected refreshToken: string | undefined;
  protected accessToken: string | undefined;
  protected backgroundProcess: t.params.BackgroundProcess | undefined;
  protected axiosConfig: AxiosRequestConfig | undefined;
  protected raiseDetailedErrors: boolean | undefined;

  public baseUrl: string = 'https://api.bitpin.ir';
  public apiVersion: string = 'v1';
  protected session: AxiosInstance;
  protected requestTimeout: number = 50000;

  constructor(params?: t.params.ClientParams) {
    this.apiKey = params?.apiKey;
    this.secretKey = params?.secretKey;
    this.refreshToken = params?.refreshToken;
    this.accessToken = params?.accessToken;
    this.backgroundProcess = params?.backgroundProcess;
    this.axiosConfig = params?.axiosConfig;
    this.raiseDetailedErrors = params?.raiseDetailedErrors;

    this.session = axios.create(this.getAxiosConfig());
  }

  protected getAxiosConfig(): AxiosRequestConfig {
    const config: AxiosRequestConfig = this.axiosConfig || {};
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return config;
  }

  protected createApiUri(
    path: string,
    version: string = this.apiVersion,
  ): string {
    return `${this.baseUrl}/${version}/${path}`;
  }

  protected getRequestKwargs(
    method: string,
    signed: boolean,
    kwargs: t.params.RequestOptions = {},
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

  private async request(
    method: string,
    uri: string,
    signed: boolean = false,
    kwargs: t.params.RequestOptions = {},
  ): Promise<any> {
    const requestConfig = this.getRequestKwargs(method, signed, kwargs);

    try {
      return (
        await this.session.request({ method, url: uri, ...requestConfig })
      ).data;
    } catch (error: any) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response !== undefined) {
          if (this.raiseDetailedErrors) {
            throw new APIErrorDetailed(
              error.response,
              'Error making request to Bitpin',
            );
          }
          throw new APIError(error.response.status, error.response.data.detail);
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

  private async requestAPI(
    method: string,
    path: string,
    signed: boolean = false,
    version: string = this.apiVersion,
    { ...kwargs }: any = {},
  ): Promise<any> {
    const uri = this.createApiUri(path, version);
    return await this.request(method, uri, signed, kwargs);
  }

  protected async get(
    path: string,
    signed: boolean = false,
    version: string = this.apiVersion,
    kwargs: t.params.RequestOptions = {},
  ): Promise<any> {
    return await this.requestAPI(
      RequestMethod.GET,
      path,
      signed,
      version,
      kwargs,
    );
  }

  protected async post(
    path: string,
    signed: boolean = false,
    version: string = this.apiVersion,
    kwargs: t.params.RequestOptions = {},
  ): Promise<any> {
    return await this.requestAPI(
      RequestMethod.POST,
      path,
      signed,
      version,
      kwargs,
    );
  }

  protected async delete(
    path: string,
    signed: boolean = false,
    version: string = this.apiVersion,
    kwargs: t.params.RequestOptions = {},
  ): Promise<any> {
    return await this.requestAPI(
      RequestMethod.DELETE,
      path,
      signed,
      version,
      kwargs,
    );
  }

  public static async create(params?: t.params.ClientParams): Promise<Client> {
    const client = new Client(params);
    if (client.apiKey && client.secretKey) {
      await client.login();
    }
    return client;
  }

  public async login(
    kwargs?: t.params.RequestOptions,
  ): Promise<t.responses.Login> {
    if (!this.apiKey || !this.secretKey) {
      throw new Error('API key and secret key are required for login');
    }
    const result = await this.post('usr/api/login/', false, 'v1', {
      data: {
        api_key: this.apiKey,
        secret_key: this.secretKey,
      },
      ...kwargs,
    });

    // Set the refresh and access tokens
    this.refreshToken = result.refresh;
    this.accessToken = result.access;

    return result;
  }

  public async refreshAccessToken(
    refreshToken?: string,
  ): Promise<t.responses.RefreshToken> {
    const result = await this.post('usr/refresh_token/', false, 'v1', {
      data: { refresh: refreshToken || this.refreshToken },
    });

    // Update the access token
    this.accessToken = result.access;

    return result;
  }

  public async getUserInfo(
    kwargs: t.params.RequestOptions = {},
  ): Promise<t.responses.UserInfo> {
    return await this.get('usr/info/', true, 'v1', kwargs);
  }

  public async getCurrenciesInfo(
    params: t.params.Page = { page: 1 },
    kwargs: t.params.RequestOptions = {},
  ): Promise<t.responses.ResultListResponse<t.responses.CurrenciesList>> {
    return await this.get(
      `mkt/currencies/?page=${params.page}`,
      false,
      'v1',
      kwargs,
    );
  }

  public async getMarketsInfo(
    params: t.params.Page = { page: 1 },
    kwargs: t.params.RequestOptions = {},
  ): Promise<t.responses.ResultListResponse<t.responses.MarketsList>> {
    return await this.get(
      `mkt/markets/?page=${params.page}`,
      false,
      'v1',
      kwargs,
    );
  }

  public async getWallet(
    kwargs: t.params.RequestOptions = {},
  ): Promise<t.responses.ResultListResponse<t.responses.Wallet>> {
    return await this.get('wlt/wallets/', true, 'v1', kwargs);
  }

  public async getOrderBook(
    params: t.params.GetOrderBookParams,
    kwargs: t.params.RequestOptions = {},
  ): Promise<t.responses.OrderBookResponse> {
    return await this.get(
      `mth/actives/${params.market}/?type=${params.type}`,
      false,
      'v2',
      kwargs,
    );
  }

  public async getRecentTrades(
    params: t.params.GetRecentTrades = {},
    kwargs: t.params.RequestOptions = {},
  ): Promise<t.responses.TradeItem[]> {
    return await this.get(`mth/matches/${params.market}/`, false, 'v1', kwargs);
  }

  public async getUserOrders(
    params: t.params.GetOpenOrdersParams = {},
    kwargs: t.params.RequestOptions = {},
  ): Promise<t.responses.ResultListResponse<t.responses.OrderStatus>> {
    return await this.get(`odr/orders/`, true, 'v1', {
      data: params,
      ...kwargs,
    });
  }

  public async createOrder(
    params: t.params.CreateOrderParams,
    kwargs: t.params.RequestOptions = {},
  ) {
    return await this.post('odr/orders/', true, 'v1', {
      data: params,
      ...kwargs,
    });
  }

  public async cancelOrder(
    params: t.params.CancelOrderParams,
    kwargs: t.params.RequestOptions = {},
  ) {
    return await this.delete(`odr/orders/${params.id}/`, true, 'v1', kwargs);
  }

  public async getUserTrades(
    params: t.params.GetTradesParams = {},
    kwargs: t.params.RequestOptions = {},
  ): Promise<t.responses.ResultListResponse<t.responses.UserTradeItem>> {
    return await this.get('odr/matches/', true, 'v1', {
      data: params,
      ...kwargs,
    });
  }
}
