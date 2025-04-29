
import { Inject, Injectable } from '@nestjs/common';
import { SmartNodeRestful } from './restful/smartnode.restful';
import { ClientService } from '@hsuite/client';
import { ValidatorsRestful } from './restful/validators.restful';
import { AccountsHashgraphRestful } from './restful/accounts-hashgraph.restful';
import { TransactionsHashgraphRestful } from './restful/transactions-hashgraph.restful';
import { HcsHashgraphRestful } from './restful/hcs-hashgraph.restful';
import { HtsHashgraphRestful } from './restful/hts-hashgraph.restful';
import { LoggerHelper } from '@hsuite/helpers';

/**
 * @file smartnode-sdk.service.ts
 * @module @hsuite/smartnode-sdk
 * @class SmartNodeSdkService
 * @description Service that provides core functionality for interacting with the SmartNode SDK.
 * Handles initialization, configuration, and exposes SDK methods for managing SmartNode operations.
 * @category Services
 * @subcategory SDK
 * @since 2.0.0
 */
@Injectable()
export class SmartNodeSdkService {
    /**
     * Logger instance for the SmartNodeSdkService
     * @type {LoggerHelper}
     */
    private logger: LoggerHelper = new LoggerHelper(SmartNodeSdkService.name);

    /**
     * Restful service for core SmartNode operations
     * @type {SmartNodeRestful}
     */
    readonly smartNodeRestful: SmartNodeRestful;

    /**
     * Restful service for validator operations
     * @type {ValidatorsRestful}
     */
    readonly validatorsRestful: ValidatorsRestful;

    /**
     * Restful service for Hashgraph Consensus Service operations
     * @type {HcsHashgraphRestful}
     */
    readonly hcsHashgraphRestful: HcsHashgraphRestful;

    /**
     * Restful service for Hashgraph account operations
     * @type {AccountsHashgraphRestful}
     */
    readonly accountsHashgraphRestful: AccountsHashgraphRestful;

    /**
     * Restful service for Hashgraph transaction operations
     * @type {TransactionsHashgraphRestful}
     */
    readonly transactionsHashgraphRestful: TransactionsHashgraphRestful;

    /**
     * Restful service for Hashgraph Token Service operations
     * @type {HtsHashgraphRestful}
     */
    readonly htsHashgraphRestful: HtsHashgraphRestful;

    /**
     * Creates an instance of SmartNodeSdkService
     * @constructor
     * @param {any} sdkOptions - Configuration options for initializing the SDK
     * @param {ClientService} client - Client service for making HTTP requests
     * @memberof SmartNodeSdkService
     * @since 2.0.0
     */
    constructor(
        @Inject('sdkOptions') private readonly sdkOptions: any,
        private readonly client: ClientService
    ) {
        this.logger.log('SmartNodeSdkService initialized');
        // TODO: add ipfs, add snapshots...
        this.smartNodeRestful = new SmartNodeRestful(this.sdkOptions, this.client);
        this.validatorsRestful = new ValidatorsRestful(this.sdkOptions, this.client);
        this.accountsHashgraphRestful = new AccountsHashgraphRestful(this.sdkOptions, this.client);
        this.transactionsHashgraphRestful = new TransactionsHashgraphRestful(this.sdkOptions, this.client);
        this.hcsHashgraphRestful = new HcsHashgraphRestful(this.sdkOptions, this.client);
        this.htsHashgraphRestful = new HtsHashgraphRestful(this.sdkOptions, this.client);
    }
}
