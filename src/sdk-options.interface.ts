import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { ISdk } from './types';

/**
 * Interface for asynchronous client options configuration.
 * 
 * @description
 * This interface extends ModuleMetadata's imports to provide flexible options for
 * configuring the client module asynchronously. It supports three patterns:
 * - Using an existing factory
 * - Creating a new factory class
 * - Using a factory function
 * 
 * @example
 * ```typescript
 * SmartNodeSdkModule.forRootAsync({
 *   imports: [ConfigModule],
 *   useFactory: (configService: ConfigService) => ({
 *     // client options configuration
 *   }),
 *   inject: [ConfigService]
 * })
 * ```
 */
export interface SmartNodeSdkModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    /**
     * An existing SmartNodeSdkOptionsFactory type to be used.
     * 
     * @description
     * Specifies an array of existing factory types that implement SmartNodeSdkOptionsFactory.
     */
    useExisting?: Array<Type<any>>;

    /**
     * A class to be instantiated as a SmartNodeSdkOptionsFactory.
     * 
     * @description
     * Specifies a class that will be instantiated to create the options factory.
     * The class should implement SmartNodeSdkOptionsFactory.
     */
    useClass?: Type<any>;

    /**
     * A factory function that returns client options.
     * 
     * @description
     * A function that will be called to create the client options.
     * Can be synchronous or asynchronous.
     * 
     * @param args - Any arguments that the factory might need.
     * @returns A promise that resolves to client options or the options directly.
     */
    useFactory?: (...args: any[]) => Promise<ISdk.IOptions> | ISdk.IOptions;

    /**
     * Optional list of providers to be injected into the context of the Factory function.
     * 
     * @description
     * Specifies dependencies that should be injected into the factory function.
     * These providers must be available in the module context.
     */
    inject?: any[];
}