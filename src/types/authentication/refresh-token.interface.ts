/**
 * @interface IRefreshTokenResponse
 * Interface representing a refresh token response.
 *
 * @category Responses
 *
 * @property {string} access - The new access token.
 *
 * @see [Refresh Token](https://docs.bitpin.ir/v1/docs/authentication/refresh_token)
 *
 * @example
 * const refreshTokenResponse: IRefreshTokenResponse = {
 *   access: "NEW_ACCESS_TOKEN"
 * };
 */
export interface IRefreshTokenResponse {
  access: string;
}

/**
 * @interface IRefreshTokenParams
 * Interface representing the parameters required to refresh a token.
 *
 * @category Authentication
 *
 * @property {string} refresh - The refresh token used to obtain a new access token.
 *
 * @see [Refresh Token](https://docs.bitpin.ir/v1/docs/authentication/refresh_token)
 *
 * @example
 * const refreshTokenParams: IRefreshTokenParams = {
 *   refresh: "YOUR_REFRESH_TOKEN"
 * };
 */
export interface IRefreshTokenParams {
  refresh: string;
}
