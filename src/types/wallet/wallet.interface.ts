import type { NumberInString } from '../types';
import { IPagination } from '../others';

/**
 * @interface IWalletResponse
 * Interface representing a wallet.
 *
 * @category Responses
 *
 * @property {number} id - The unique identifier of the wallet.
 * @property {string} asset - The asset type of the wallet.
 * @property {NumberInString} balance - The balance of the wallet.
 * @property {NumberInString} frozen - The frozen amount in the wallet.
 * @property {string} service - The service associated with the wallet.
 *
 * @see [Wallets](https://docs.bitpin.ir/v1/docs/wallets)
 * @see {@link NumberInString}
 *
 * @example
 * const wallet: IWallet = {
 *   id: 3108164,
 *   asset: "RIAL",
 *   balance: "1671.6",
 *   frozen: "0.0",
 *   service: "main"
 * };
 */
export interface IWalletResponse {
  id: number;
  asset: string;
  balance: NumberInString;
  frozen: NumberInString;
  service: string;
}

/**
 * @interface IGetWalletsParams
 * Interface representing the parameters for querying wallets.
 *
 * @category Parameters
 *
 * @property {string[]} [assets] - Optional array of asset types to filter the wallets.
 * @property {string} [service] - Optional service associated with the wallets.
 *
 * @extends IPagination
 *
 * @example
 * const walletParams: IWalletParams = {
 *   assets: ["BTC", "ETH"],
 *   service: "main",
 *   offset: 0,
 *   limit: 10
 * };
 */
export interface IGetWalletsParams extends IPagination {
  assets?: string[];
  service?: string;
}
