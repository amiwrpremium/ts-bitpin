/**
 * Interface representing background processes configuration.
 *
 * @interface IBackgroundProcesses
 *
 * @category Parameters
 *
 * @property {number} [backgroundReloginInterval] - Interval for background relogin in milliseconds.
 * @property {number} [backgroundRefreshTokenInterval] - Interval for background refresh token in milliseconds.
 */
export interface IBackgroundProcesses {
  backgroundReloginInterval?: number;
  backgroundRefreshTokenInterval?: number;
}
