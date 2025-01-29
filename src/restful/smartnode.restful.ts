import { ClientService } from '@hsuite/client';
import { BaseRestful } from './base.restful';
import { ISmartNetwork } from '@hsuite/smart-network-types';
import { Inject } from '@nestjs/common';

/**
 * @file smartnode.restful.ts
 * @class SmartNodeRestful
 * @extends BaseRestful
 * @description 
 * Restful service for interacting with the SmartNode core functionality.
 * Provides methods for retrieving SmartNode status, network information, and utilities.
 * This service handles all core SmartNode operations and network-level interactions.
 * 
 * @example
 * ```typescript
 * const smartNodeRestful = new SmartNodeRestful(sdkOptions, clientService);
 * 
 * // Get SmartNode status
 * const status = await smartNodeRestful.getStatus();
 * 
 * // Get network information
 * const network = await smartNodeRestful.getNetwork();
 * ```
 * 
 * @category Services
 * @subcategory Restful
 * @since 2.0.0
 */
export class SmartNodeRestful extends BaseRestful {
    /**
     * Creates an instance of SmartNodeRestful
     * 
     * @description
     * Initializes a new SmartNodeRestful service with the provided SDK options and client service.
     * The service is configured with the 'smart-node' base path for API endpoints.
     * 
     * @constructor
     * @param {any} sdkOptions - Configuration options for initializing the SDK
     * @param {ClientService} client - Client service instance for making API requests
     * @throws {Error} When required dependencies are not provided
     * @memberof SmartNodeRestful
     * @since 2.0.0
     */
    constructor(
        @Inject('sdkOptions') private readonly sdkOptions: any,
        protected readonly client: ClientService
    ) {
        super(client, 'smart-node');
    }

    /**
     * Retrieves the SmartNode identifier
     * 
     * @method getIdentifier
     * @description 
     * Gets the unique identifier and details of the SmartNodeOperator.
     * This identifier is used to distinguish this node in the network.
     * 
     * @example
     * ```typescript
     * const identifier = await smartNodeRestful.getIdentifier();
     * console.log('Node ID:', identifier.id);
     * ```
     * 
     * @returns {Promise<ISmartNetwork.IOperator.IEntity>} SmartNodeOperator entity details
     * @throws {Error} When identifier retrieval fails or network is unreachable
     * @memberof SmartNodeRestful
     * @since 2.0.0
     */
    async getIdentifier(): Promise<ISmartNetwork.IOperator.IEntity> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/identifier`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting identifier', error);
            throw error;
        }
    }

    /**
     * Gets the current status of the SmartNode
     * 
     * @method getStatus
     * @description 
     * Retrieves the current operational status and health metrics of this SmartNode.
     * Includes information about node uptime, performance, and network connectivity.
     * 
     * @example
     * ```typescript
     * const status = await smartNodeRestful.getStatus();
     * console.log('Node Status:', status.health);
     * ```
     * 
     * @returns {Promise<ISmartNetwork.ISmartNode.IState>} Current state of the SmartNode
     * @throws {Error} When status retrieval fails or node is unreachable
     * @memberof SmartNodeRestful
     * @since 2.0.0
     */
    async getStatus(): Promise<ISmartNetwork.ISmartNode.IState> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/status`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting status', error);
            throw error;
        }
    }

    /**
     * Retrieves network information
     * 
     * @method getNetwork
     * @description 
     * Gets the comprehensive list of all smart-nodes whitelisted in the network.
     * Provides details about each node's status, capabilities, and network role.
     * 
     * @example
     * ```typescript
     * const network = await smartNodeRestful.getNetwork();
     * console.log('Network Size:', network.length);
     * ```
     * 
     * @returns {Promise<Array<ISmartNetwork.INetwork.IEntity>>} Array of network entities
     * @throws {Error} When network information retrieval fails or network is unreachable
     * @memberof SmartNodeRestful
     * @since 2.0.0
     */
    async getNetwork(): Promise<Array<ISmartNetwork.INetwork.IEntity>> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/network`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting network', error);
            throw error;
        }
    }

    /**
     * Gets utility functions and capabilities
     * 
     * @method getUtilities
     * @description 
     * Retrieves the comprehensive list of HSuite utility tokens and their capabilities.
     * Includes information about token functionality, permissions, and network usage.
     * 
     * @example
     * ```typescript
     * const utilities = await smartNodeRestful.getUtilities();
     * console.log('Available Utilities:', utilities.map(u => u.name));
     * ```
     * 
     * @returns {Promise<Array<ISmartNetwork.INetwork.IUtility>>} Array of SmartNode utilities
     * @throws {Error} When utilities retrieval fails or service is unavailable
     * @memberof SmartNodeRestful
     * @since 2.0.0
     */
    async getUtilities(): Promise<Array<ISmartNetwork.INetwork.IUtility>> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/utilities`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting utilities', error);
            throw error;
        }
    }
}