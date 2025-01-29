import { _IOptions } from './interfaces/smartnode-sdk.options.interface';

/**
 * SmartNode SDK Interface Namespace
 * 
 * @description
 * This namespace encapsulates interfaces and types related to the SmartNode SDK configuration.
 * It provides comprehensive type definitions for configuring and initializing the SmartNode SDK,
 * ensuring type safety and proper configuration validation.
 * 
 * @example
 * ```typescript
 * // Basic SDK configuration
 * const sdkOptions: ISdk.IOptions = {
 *   client: {
 *     baseUrl: 'https://api.smartnode.example.com',
 *     timeout: 5000,
 *     headers: {
 *       'Authorization': 'Bearer your-token'
 *     }
 *   }
 * };
 * 
 * // Using the configuration
 * const sdk = new SmartNodeSdkService(sdkOptions);
 * ```
 * 
 * @namespace ISdk
 * @since 2.0.0
 */
export namespace ISdk {
    /**
     * SDK Options interface
     * 
     * @description
     * Type definition for SDK configuration options. This includes client settings,
     * authentication parameters, network configurations, and other essential
     * parameters needed to initialize and operate the SDK.
     * 
     * The options interface ensures that all required configuration parameters
     * are properly typed and validated during SDK initialization.
     * 
     * @example
     * ```typescript
     * // Creating a typed options object
     * const options: ISdk.IOptions = {
     *   client: {
     *     baseUrl: process.env.API_URL,
     *     retryAttempts: 3,
     *     timeout: 10000
     *   },
     *   logging: {
     *     level: 'debug',
     *     format: 'json'
     *   }
     * };
     * ```
     * 
     * @type {_IOptions}
     * @since 2.0.0
     */
    export type IOptions = _IOptions
}