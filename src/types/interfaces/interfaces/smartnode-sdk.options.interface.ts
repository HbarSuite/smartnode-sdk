import { IClient } from "@hsuite/client-types";

/**
 * Interface defining the options for the SmartNode SDK
 * 
 * @description
 * This interface specifies the configuration options required for initializing
 * and configuring the SmartNode SDK. It includes client configuration settings
 * that determine how the SDK interacts with the SmartNode network.
 * 
 * @example
 * ```typescript
 * const sdkOptions: _IOptions = {
 *   client: {
 *     // Client configuration options
 *   }
 * };
 * ```
 */
export interface _IOptions {
    /**
     * Client configuration options
     * 
     * @description
     * Configuration settings for the SmartNode client, including connection
     * parameters, authentication details, and other client-specific options.
     * 
     * @type {IClient.IOptions}
     */
    client: IClient.IOptions
}
