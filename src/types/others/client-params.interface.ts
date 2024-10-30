import { AxiosRequestConfig } from 'axios';
import { TLD } from '../types';
import { IBackgroundProcesses } from './background-processes.interface';

/**
 * Interface representing client parameters configuration.
 *
 * @interface IClientParams
 *
 * @category Parameters
 *
 * @property {string} [apiKey] - The API key for authentication.
 * @property {string} [secretKey] - The secret key for authentication.
 * @property {string} [refreshToken] - The refresh token for obtaining new access tokens.
 * @property {string} [accessToken] - The access token for authentication.
 * @property {IBackgroundProcesses} [backgroundProcess] - Configuration for background processes.
 * @property {TLD} [tld] - The top-level domain for the client.
 * @property {AxiosRequestConfig} [axiosConfig] - Axios request configuration.
 */
export interface IClientParams {
  apiKey?: string;
  secretKey?: string;
  refreshToken?: string;
  accessToken?: string;
  backgroundProcess?: IBackgroundProcesses;
  tld?: TLD;
  axiosConfig?: AxiosRequestConfig;
}
