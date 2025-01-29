import { ApiSchema } from "@hsuite/nestjs-swagger";
import { _Options } from './models/smartnode-sdk.models.options.model';

/**
 * SmartNode SDK Namespace
 * 
 * @description
 * This namespace encapsulates classes and types related to the SmartNode SDK configuration.
 * It provides concrete implementation classes for configuring and initializing the SmartNode SDK,
 * with full type safety and runtime validation through class-based models.
 * 
 * The namespace includes model classes that implement the interfaces defined in the ISdk namespace,
 * providing additional functionality such as validation, serialization, and default values.
 * 
 * @export
 * @namespace Sdk
 * @example
 * ```typescript
 * // Creating and configuring SDK options
 * const sdkOptions = new Sdk.Options();
 * 
 * // Configure client options
 * sdkOptions.client = new SmartNode.Client.Options({
 *   baseUrl: 'https://api.smartnode.example.com',
 *   timeout: 5000,
 *   retryAttempts: 3
 * });
 * 
 * // Configure logging options
 * sdkOptions.logging = {
 *   level: 'debug',
 *   format: 'json'
 * };
 * 
 * // Initialize SDK with options
 * const sdk = new SmartNodeSdkService(sdkOptions);
 * ```
 * 
 * @since 2.0.0
 */
export namespace Sdk {
    /**
     * SDK Options class
     * 
     * @description
     * Class for configuring the SmartNode SDK. Extends the base _Options class
     * to provide a concrete implementation with API schema decoration and additional
     * functionality for configuration management.
     * 
     * This class implements runtime validation and provides helper methods for
     * configuration setup. It ensures that all required options are properly
     * set and validated before SDK initialization.
     * 
     * @export
     * @class Options
     * @extends {_Options}
     * @example
     * ```typescript
     * // Create new options instance
     * const options = new Options();
     * 
     * // Configure with type checking
     * options.client = new SmartNode.Client.Options({
     *   baseUrl: process.env.API_URL,
     *   timeout: parseInt(process.env.TIMEOUT) || 5000,
     *   headers: {
     *     'X-API-Key': process.env.API_KEY
     *   }
     * });
     * 
     * // Add custom configuration
     * options.customConfig = {
     *   feature: true,
     *   maxRetries: 3
     * };
     * ```
     * 
     * @since 2.0.0
     */
    @ApiSchema({ name: 'SmartNodeSdk.Options' })
    export class Options extends _Options {}
}