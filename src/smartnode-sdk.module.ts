import { DynamicModule, Module } from '@nestjs/common';
import { SmartNodeSdkService } from './smartnode-sdk.service';
import { SmartNodeSdkModuleAsyncOptions } from './sdk-options.interface';
import { ClientModule } from '@hsuite/client';

/**
 * SmartNode SDK Module
 * 
 * @description
 * This module provides integration with the SmartNode SDK functionality.
 * It handles configuration and initialization of the SDK services.
 */
@Module({})
export class SmartNodeSdkModule {
  /**
   * Asynchronously configures and returns the SmartNodeSdkModule
   * 
   * @description
   * This static method configures the SmartNodeSdkModule with the provided options.
   * It sets up:
   * - Client module integration
   * - SDK options provider
   * - SDK service provider
   * - Global module scope
   * 
   * @param options - Configuration options for the module including imports,
   *                 factory methods, and dependency injection settings
   * @returns A promise that resolves to a configured DynamicModule instance
   * 
   * @example
   * ```typescript
   * await SmartNodeSdkModule.forRootAsync({
   *   imports: [ConfigModule],
   *   useFactory: async (configService: ConfigService) => ({
   *     client: {
   *       // client configuration options
   *     }
   *   }),
   *   inject: [ConfigService]
   * });
   * ```
   */
  static async forRootAsync(options: SmartNodeSdkModuleAsyncOptions): Promise<DynamicModule> {
    return {
      module: SmartNodeSdkModule,
      imports: [
        ...options.imports,
        ClientModule.forRootAsync({
          imports: options.imports,
          useExisting: options.useExisting,
          useFactory: async (...args: any[]) => {
            const sdkOptions = await options.useFactory(...args);
            return sdkOptions.client;
          },
          inject: options.inject
        }),
      ],
      providers: [
        {
          provide: 'sdkOptions',
          useFactory: options.useFactory,
          inject: options.useExisting
        },
        SmartNodeSdkService
      ],
      exports: [
        // 'sdkOptions',
        SmartNodeSdkService
      ],
      global: true
    }
  }  
}