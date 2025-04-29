import { Logger } from '@nestjs/common';
import { ClientService } from '@hsuite/client';
import { LoggerHelper } from '@hsuite/helpers';

/**
 * Abstract base class for RESTful services in the SmartNode SDK
 * 
 * @description
 * Provides common functionality and base infrastructure for making HTTP requests
 * to SmartNode endpoints. This class serves as the foundation for all specific
 * RESTful service implementations in the SDK.
 * 
 * @abstract
 * @class BaseRestful
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * class MyRestful extends BaseRestful {
 *   constructor(client: ClientService) {
 *     super(client, 'my-endpoint');
 *   }
 * }
 * ```
 */
export abstract class BaseRestful {
  /**
   * Logger instance for the class
   * @type {LoggerHelper}
   */
  protected readonly logger: LoggerHelper = new LoggerHelper(BaseRestful.name);

  /**
   * Creates an instance of BaseRestful
   * 
   * @description
   * Initializes a new RESTful service with the provided client service and base path.
   * The base path is used to construct the full endpoint URLs for API requests.
   * 
   * @param {ClientService} client - Client service for making HTTP requests
   * @param {string} basePath - Base path for API endpoints
   * @throws {Error} When client or basePath is not provided
   * @since 2.0.0
   */
  constructor(
    protected readonly client: ClientService,
    protected readonly basePath: string
  ) {}
}