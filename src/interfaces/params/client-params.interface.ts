import { AxiosRequestConfig } from 'axios';
import { BackgroundProcess } from './background-process.interface';

export interface ClientParams {
  apiKey?: string;
  secretKey?: string;
  refreshToken?: string;
  accessToken?: string;
  backgroundProcess?: BackgroundProcess;
  axiosConfig?: AxiosRequestConfig;
  raiseDetailedErrors?: boolean;
}
