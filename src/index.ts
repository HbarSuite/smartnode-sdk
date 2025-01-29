/**
 * @module SmartNodeSdk
 * @description
 * This module provides integration with the SmartNode SDK functionality.
 * It exports the main module and service for configuring and using the SDK.
 * 
 * @example
 * ```typescript
 * // Import and use the module
 * import { SmartNodeSdkModule } from '@hsuite/smartnode-sdk';
 * 
 * @Module({
 *   imports: [
 *     SmartNodeSdkModule.forRootAsync({
 *       // configuration options
 *     })
 *   ]
 * })
 * ```
 */

export * from './smartnode-sdk.module';
export * from './smartnode-sdk.service';
