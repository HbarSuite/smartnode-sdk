import { ApiProperty } from '@hsuite/nestjs-swagger'
import { Client } from '@hsuite/client-types'
import { ISdk } from '../../interfaces/sdk.namespace';
/**
 * Class representing configuration options for the SmartNode SDK
 * 
 * @description
 * This class defines the structure and validation for SmartNode SDK configuration options.
 * It implements the ISdk.IOptions interface and provides type-safe configuration
 * for initializing the SDK with client settings.
 * 
 * @export
 * @class _Options
 * @implements {ISdk.IOptions}
 * @example
 * ```typescript
 * const options = new _Options();
 * options.client = new Client.Options();
 * ```
 */
export class _Options implements ISdk.IOptions {
    /**
     * Client configuration options
     * 
     * @description
     * Configuration settings for the SmartNode client component of the SDK.
     * These settings determine how the SDK interacts with the SmartNode network.
     * 
     * @type {Client.Options}
     * @memberof _Options
     */
    @ApiProperty({
        type: () => Client.Options
    })
    client: Client.Options
}