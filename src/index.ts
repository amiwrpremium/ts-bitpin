/**
 * @fileoverview This is the main entry point for the `ts-bitpin` package.
 * It exports the Client class from the client module, which is the main class for interacting with the functionality provided by this module.
 * It also exports all the enums and interfaces from their respective modules.
 * The enums define a set of named constants that can be used throughout the application.
 * The interfaces define the shape of the objects used in the application, ensuring type safety.
 *
 * @version 2.0.0
 * @package ts-bitpin
 * @module src/index
 */

export { Client } from './client';
export * as enums from './enums';
export * as types from './types';
