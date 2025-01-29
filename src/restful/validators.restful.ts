// libs/smartnode-sdk/src/restful/validators.restful.ts

import { ClientService } from '@hsuite/client';
import { BaseRestful } from './base.restful';
import { IValidators } from '@hsuite/validators-types';
import { Inject } from '@nestjs/common';

/**
 * @file validators.restful.ts
 * @class ValidatorsRestful
 * @extends BaseRestful
 * @description Restful service for managing validators in the consensus, token, and account topics.
 * Provides methods for adding and reading validators from different topics.
 * @category Services
 * @subcategory Restful
 * @since 2.0.0
 */
export class ValidatorsRestful extends BaseRestful {
    /**
     * Creates an instance of ValidatorsRestful
     * @constructor
     * @param {any} sdkOptions - Configuration options for initializing the SDK
     * @param {ClientService} client - Client service instance for making API requests
     * @memberof ValidatorsRestful
     * @since 2.0.0
     */
    constructor(
        @Inject('sdkOptions') private readonly sdkOptions: any,
        protected readonly client: ClientService
    ) {
        super(client, 'validators');
    }

    /**
     * Adds a validator to the consensus topic
     * @method addConsensusValidator
     * @description Submits a new validator to the consensus topic with specified validation parameters
     * @param {IValidators.IConsensus.IValidationParams} validationParams - Parameters for consensus validation
     * @returns {Promise<string>} Consensus timestamp of the submitted transaction
     * @throws {Error} If validation parameters are invalid
     * @memberof ValidatorsRestful
     * @since 2.0.0
     */
    async addConsensusValidator(
        validationParams: IValidators.IConsensus.IValidationParams
    ): Promise<string> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/consensus`, validationParams);
            return response.data;
        } catch (error) {
            this.logger.error('Error adding consensus validator', error);
            throw error;
        }
    }

    /**
     * Reads a validator from the consensus topic
     * @method readConsensusValidator
     * @description Retrieves validator information from the consensus topic using a timestamp
     * @param {string} timestamp - Consensus timestamp to read the validator from
     * @returns {Promise<IValidators.IConsensus.IValidationParams>} Validator data
     * @throws {Error} If consensus timestamp is invalid
     * @memberof ValidatorsRestful
     * @since 2.0.0
     */
    async readConsensusValidator(
        timestamp: string
    ): Promise<IValidators.IConsensus.IValidationParams> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/consensus/${timestamp}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error reading consensus validator', error);
            throw error;
        }
    }

    /**
     * Adds a validator to the tokens topic
     * @method addTokenValidator
     * @description Submits a new validator to the tokens topic with specified validation parameters
     * @param {IValidators.IToken.IValidationParams} validationParams - Parameters for token validation
     * @returns {Promise<string>} Consensus timestamp of the submitted transaction
     * @throws {Error} If validation parameters are invalid
     * @memberof ValidatorsRestful
     * @since 2.0.0
     */
    async addTokenValidator(
        validationParams: IValidators.IToken.IValidationParams
    ): Promise<string> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/tokens`, validationParams);
            return response.data;
        } catch (error) {
            this.logger.error('Error adding token validator', error);
            throw error;
        }
    }

    /**
     * Reads a validator from the tokens topic
     * @method readTokenValidator
     * @description Retrieves validator information from the tokens topic using a timestamp
     * @param {string} timestamp - Consensus timestamp to read the validator from
     * @returns {Promise<IValidators.IToken.IValidationParams>} Token validator data
     * @throws {Error} If consensus timestamp is invalid
     * @memberof ValidatorsRestful
     * @since 2.0.0
     */
    async readTokenValidator(
        timestamp: string
    ): Promise<IValidators.IToken.IValidationParams> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/tokens/${timestamp}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error reading token validator', error);
            throw error;
        }
    }

    /**
     * Adds a validator to the accounts topic
     * @method addAccountValidator
     * @description Submits a new validator to the accounts topic with specified validation parameters
     * @param {IValidators.IAccount.IValidationParams} validationParams - Parameters for account validation
     * @returns {Promise<string>} Consensus timestamp of the submitted transaction
     * @throws {Error} If validation parameters are invalid
     * @memberof ValidatorsRestful
     * @since 2.0.0
     */
    async addAccountValidator(
        validationParams: IValidators.IAccount.IValidationParams
    ): Promise<string> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/accounts`, validationParams);
            return response.data;
        } catch (error) {
            this.logger.error('Error adding account validator', error);
            throw error;
        }
    }

    /**
     * Reads a validator from the accounts topic
     * @method readAccountValidator
     * @description Retrieves validator information from the accounts topic using a timestamp
     * @param {string} timestamp - Consensus timestamp to read the validator from
     * @returns {Promise<IValidators.IAccount.IValidationParams>} Account validator data
     * @throws {Error} If consensus timestamp is invalid
     * @memberof ValidatorsRestful
     * @since 2.0.0
     */
    async readAccountValidator(
        timestamp: string
    ): Promise<IValidators.IAccount.IValidationParams> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/accounts/${timestamp}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error reading account validator', error);
            throw error;
        }
    }
}