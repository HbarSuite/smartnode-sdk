
import { Inject, Injectable, Logger } from '@nestjs/common';
import { SmartNodeRestful } from './restful/smartnode.restful';
import { ClientService } from '@hsuite/client';
import { ValidatorsRestful } from './restful/validators.restful';
import { AccountsHashgraphRestful } from './restful/accounts-hashgraph.restful';
import { TransactionsHashgraphRestful } from './restful/transactions-hashgraph.restful';
import { HcsHashgraphRestful } from './restful/hcs-hashgraph.restful';
import { HtsHashgraphRestful } from './restful/hts-hashgraph.restful';

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
    /** Logger instance for the SmartNodeSdkService */
    private logger: Logger = new Logger(SmartNodeSdkService.name);

    /** Restful service for core SmartNode operations */
    readonly smartNodeRestful: SmartNodeRestful;

    /** Restful service for validator operations */
    readonly validatorsRestful: ValidatorsRestful;

    /** Restful service for Hashgraph Consensus Service operations */
    readonly hcsHashgraphRestful: HcsHashgraphRestful;

    /** Restful service for Hashgraph account operations */
    readonly accountsHashgraphRestful: AccountsHashgraphRestful;

    /** Restful service for Hashgraph transaction operations */
    readonly transactionsHashgraphRestful: TransactionsHashgraphRestful;

    /** Restful service for Hashgraph Token Service operations */
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
        this.smartNodeRestful = new SmartNodeRestful(sdkOptions, client);
        this.validatorsRestful = new ValidatorsRestful(sdkOptions, client);
        this.accountsHashgraphRestful = new AccountsHashgraphRestful(sdkOptions, client);
        this.transactionsHashgraphRestful = new TransactionsHashgraphRestful(sdkOptions, client);
        this.hcsHashgraphRestful = new HcsHashgraphRestful(sdkOptions, client);
        this.htsHashgraphRestful = new HtsHashgraphRestful(sdkOptions, client);
    }
}
