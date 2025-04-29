// libs/smartnode-sdk/src/restful/transactions-hashgraph.restful.ts

import { ClientService } from '@hsuite/client';
import { BaseRestful } from './base.restful';
import { IHashgraph, Hashgraph } from '@hsuite/hashgraph-types';
import { Inject } from '@nestjs/common';

/**
 * @file transactions-hashgraph.restful.ts
 * @class TransactionsHashgraphRestful
 * @extends BaseRestful
 * @description Restful service for handling transaction-related operations
 */
export class TransactionsHashgraphRestful extends BaseRestful {
    constructor(
        @Inject('sdkOptions') private readonly sdkOptions: any,
        protected readonly client: ClientService
    ) {
        super(client, 'transactions');
    }

    /**
     * Get transaction by ID
     * @method getTransactionById
     * @param {string} transactionId - Transaction ID
     * @param {number} [nonce] - Optional nonce value
     * @param {boolean} [scheduled] - Optional scheduled flag
     * @returns {Promise<Hashgraph.Ledger.Transaction.Record>}
     */
    async getTransactionById(
        transactionId: string
    ): Promise<Hashgraph.Ledger.Transaction.Record> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/query/${transactionId}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting transaction by ID', error);
            throw error;
        }
    }

    /**
     * Get transaction receipt by ID
     * @method getTransactionReceipt
     * @param {string} transactionId - Transaction ID
     * @returns {Promise<Hashgraph.Ledger.Transaction.Receipt>}
     */
    async getTransactionReceipt(
        transactionId: string
    ): Promise<Hashgraph.Ledger.Transaction.Receipt> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/receipt/${transactionId}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting transaction by ID', error);
            throw error;
        }
    }

    /**
     * Get transaction by ID from mirror node
     * @method getRestfulTransactionById
     * @param {string} transactionId - Transaction ID
     * @param {number} [nonce] - Optional nonce value
     * @param {boolean} [scheduled] - Optional scheduled flag
     * @returns {Promise<Hashgraph.Restful.Transactions.Transaction.Details>}
     */
    async getRestfulTransactionById(
        transactionId: string,
        nonce?: number,
        scheduled?: boolean
    ): Promise<Hashgraph.Restful.Transactions.Transaction.Details> {
        try {
            const params = new URLSearchParams();
            if (nonce !== undefined) params.append('nonce', nonce.toString());
            if (scheduled !== undefined) params.append('scheduled', scheduled.toString());

            const response = await this.client.axios.get(
                `mirrors/${this.basePath}/${transactionId}`,
                { params }
            );
            return response.data;
        } catch (error) {
            this.logger.error('Error getting transaction from mirror', error);
            throw error;
        }
    }

    /**
     * Get transaction state proof
     * @method getTransactionStateProof
     * @param {string} transactionId - Transaction ID
     * @param {number} [nonce] - Optional nonce value
     * @param {boolean} [scheduled] - Optional scheduled flag
     * @returns {Promise<Hashgraph.Commons.StateProof.Response.Compact>}
     */
    async getTransactionStateProof(
        transactionId: string,
        nonce?: number,
        scheduled?: boolean
    ): Promise<Hashgraph.Commons.StateProof.Response.Compact> {
        try {
            const params = new URLSearchParams();
            if (nonce !== undefined) params.append('nonce', nonce.toString());
            if (scheduled !== undefined) params.append('scheduled', scheduled.toString());

            const response = await this.client.axios.get(
                `mirrors/${this.basePath}/${transactionId}/stateproof`,
                { params }
            );
            return response.data;
        } catch (error) {
            this.logger.error('Error getting transaction state proof', error);
            throw error;
        }
    }

    /**
     * Get scheduled transaction
     * @method getScheduledTransaction
     * @param {string} scheduleId - Schedule ID
     * @returns {Promise<Hashgraph.Restful.Transactions.Schedule.Entity>}
     */
    async getScheduledTransaction(
        scheduleId: string
    ): Promise<Hashgraph.Restful.Transactions.Schedule.Entity> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/schedules/${scheduleId}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting scheduled transaction', error);
            throw error;
        }
    }
}