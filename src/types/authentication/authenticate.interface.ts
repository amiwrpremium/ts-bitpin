/**
 * @interface IAuthenticateResponse
 * Interface representing an authentication response.
 *
 * @category Responses
 *
 * @property {string} refresh - The refresh token.
 * @property {string} access - The access token.
 *
 * @see [Authentication](https://docs.bitpin.ir/v1/docs/authentication/intro)
 *
 * @example
 * const authResponse: IAuthenticateResponse = {
 *   refresh: "eyJ0eXAiOiJKV....kIjoyLCJpcCI6IjE3Mi4xOC4wLjEifQ.LJd44M3...-0CiH2gokd_OWGBN3UnI",
 *   access: "eyJ0eXAiOiJKV1Q....JqdGkiOiI3ZmM0YWY2ZjY1N2Y0MDU5YWRlNTY3...iNjMxZSI8UpTDxOS_utTTZW36W0KgU"
 * };
 */
export interface IAuthenticateResponse {
  refresh: string;
  access: string;
}

/**
 * @interface IAuthenticationParams
 * Interface representing the parameters required for authentication.
 *
 * @category Authentication
 *
 * @property {string} apiKey - The API key used for authentication.
 * @property {string} secretKey - The secret key used for authentication.
 *
 * @see [Authentication](https://docs.bitpin.ir/v1/docs/authentication/intro)
 *
 * @example
 * const authParams: IAuthenticationParams = {
 *   apiKey: "your_api_key",
 *   secretKey: "your_secret_key"
 * };
 */
export interface IAuthenticationParams {
  apiKey: string;
  secretKey: string;
}
