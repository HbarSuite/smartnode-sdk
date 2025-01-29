// libs/smartnode-sdk/src/restful/accounts-hashgraph.restful.ts

import { ClientService } from '@hsuite/client';
import { BaseRestful } from './base.restful';
import { Inject } from '@nestjs/common';
import { IHashgraph, Hashgraph } from '@hsuite/hashgraph-types';

/**
 * @file accounts-hashgraph.restful.ts
 * @class AccountsHashgraphRestful
 * @extends BaseRestful
 * @description Restful service for managing Hashgraph account operations.
 * Provides methods for:
 * - Account information and balance retrieval
 * - Account creation, update and deletion
 * - Token transfers (HBAR, Fungible Tokens, NFTs)
 * - Atomic swaps
 * - Allowance management
 * @category Services
 * @subcategory Restful
 * @since 2.0.0
 */
export class AccountsHashgraphRestful extends BaseRestful {
    constructor(
        @Inject('sdkOptions') private readonly sdkOptions: any,
        protected readonly client: ClientService
    ) {
        super(client, 'accounts');
    }

    /**
     * Get account information
     * @method getInfo
     * @description Retrieves detailed information about a specific Hashgraph account
     * @param {string} accountId - Account ID to get information for
     * @returns {Promise<Hashgraph.Ledger.Accounts.Info>} Account information
     * @throws {Error} If account lookup fails
     */
    async getInfo(accountId: string): Promise<Hashgraph.Ledger.Accounts.Info> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/${accountId}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting account info', error);
            throw error;
        }
    }

    /**
     * Get account public key
     * @method getKeys
     * @description Retrieves the public key associated with a specific Hashgraph account
     * @param {string} accountId - Account ID to get public key for
     * @returns {Promise<string>} Account's public key
     * @throws {Error} If key retrieval fails
     */
    async getKeys(accountId: string): Promise<string> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/${accountId}/publicKey`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting account keys', error);
            throw error;
        }
    }

    /**
     * Get account balance
     * @method getQueryBalance
     * @description Retrieves the current balance of a specific Hashgraph account
     * @param {string} accountId - Account ID to get balance for
     * @returns {Promise<Hashgraph.Ledger.Accounts.Balance>} Account balance
     * @throws {Error} If balance retrieval fails
     */
    async getQueryBalance(accountId: string): Promise<Hashgraph.AccountBalance> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/${accountId}/balance`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting account balance', error);
            throw error;
        }
    }

    /**
     * Create new Hashgraph account
     * @method createAccount
     * @description Creates a new account with specified parameters
     * @param {IHashgraph.ILedger.IAccounts.IRequest.ICreate} params - Account creation parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If account creation fails
     */
    async createAccount(
        params: IHashgraph.ILedger.IAccounts.IRequest.ICreate
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(this.basePath, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error creating account', error);
            throw error;
        }
    }

    /**
     * Delete Hashgraph account
     * @method deleteAccount
     * @description Deletes an account and transfers remaining funds
     * @param {string} accountId - Account ID to delete
     * @param {IHashgraph.ILedger.IAccounts.IRequest.IDelete} params - Deletion parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If account deletion fails
     */
    async deleteAccount(
        accountId: string,
        params: IHashgraph.ILedger.IAccounts.IRequest.IDelete
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.delete(`${this.basePath}/${accountId}`, { data: params });
            return response.data;
        } catch (error) {
            this.logger.error('Error deleting account', error);
            throw error;
        }
    }

    /**
     * Update account properties
     * @method updateAccount
     * @description Updates various properties of a Hashgraph account
     * @param {string} accountId - Account ID to update
     * @param {IHashgraph.ILedger.IAccounts.IRequest.IUpdate} params - Update parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If account update fails
     */
    async updateAccount(
        accountId: string,
        params: IHashgraph.ILedger.IAccounts.IRequest.IUpdate
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.put(`${this.basePath}/${accountId}`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error updating account', error);
            throw error;
        }
    }

    /**
     * Transfer HBAR between accounts
     * @method transferHbar
     * @description Transfers HBAR from one account to another
     * @param {IHashgraph.ILedger.IAccounts.IRequest.ITransfer.IHbar} params - HBAR transfer parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If HBAR transfer fails
     */
    async transferHbar(
        params: IHashgraph.ILedger.IAccounts.IRequest.ITransfer.IHbar
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/transfer/hbar`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error transferring HBAR', error);
            throw error;
        }
    }

    /**
     * Transfer fungible token between accounts
     * @method transferToken
     * @description Transfers fungible tokens from one account to another
     * @param {IHashgraph.ILedger.IAccounts.IRequest.ITransfer.IFungibleToken} params - Token transfer parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If token transfer fails
     */
    async transferToken(
        params: IHashgraph.ILedger.IAccounts.IRequest.ITransfer.IFungibleToken
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/transfer/token`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error transferring token', error);
            throw error;
        }
    }

    /**
     * Transfer NFT between accounts
     * @method transferNftToken
     * @description Transfers an NFT from one account to another
     * @param {IHashgraph.ILedger.IAccounts.IRequest.ITransfer.INft} params - NFT transfer parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If NFT transfer fails
     */
    async transferNftToken(
        params: IHashgraph.ILedger.IAccounts.IRequest.ITransfer.INft
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/transfer/nft`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error transferring NFT', error);
            throw error;
        }
    }

    /**
     * Perform atomic swap between accounts
     * @method atomicSwap
     * @description Executes an atomic swap of tokens between accounts
     * @param {IHashgraph.ILedger.IAccounts.IRequest.ITransfer.IAtomicSwap} params - Atomic swap parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If atomic swap fails
     */
    async atomicSwap(
        params: IHashgraph.ILedger.IAccounts.IRequest.ITransfer.IAtomicSwap
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/transfer/atomic-swap`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error performing atomic swap', error);
            throw error;
        }
    }

    /**
     * Approve allowance
     * @method approveAllowance
     * @description Approves token allowance for another account
     * @param {IHashgraph.ILedger.IAccounts.IRequest.IAllowanceApproval} params - Allowance parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If allowance approval fails
     */
    async approveAllowance(
        params: IHashgraph.ILedger.IAccounts.IRequest.IAllowanceApproval
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/allowance/approve`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error approving allowance', error);
            throw error;
        }
    }

    /**
     * Delete allowance
     * @method deleteAllowance
     * @description Deletes token allowance for an account
     * @param {IHashgraph.ILedger.IAccounts.IRequest.IAllowanceDelete} params - Allowance deletion parameters
     * @returns {Promise<Uint8Array>} Transaction bytes
     * @throws {Error} If allowance deletion fails
     */
    async deleteAllowance(
        params: IHashgraph.ILedger.IAccounts.IRequest.IAllowanceDelete
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/allowance/delete`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error deleting allowance', error);
            throw error;
        }
    }

    /**
     * Get detailed account information with filters
     * @method getRestfulInfo
     * @description Retrieves comprehensive account details including balance, transactions, and metadata
     * @param {string} accountId - Account ID to get information for
     * @param {number} limit - Maximum number of items to return
     * @param {string} order - Order of items (asc/desc)
     * @param {string} timestamp - Consensus timestamp for filtering
     * @param {IHashgraph.IRestful.ITransactions.ITransaction.TypeEnum} transactionType - Transaction type filter
     * @param {boolean} transactions - Whether to include transactions
     * @returns {Promise<Hashgraph.Restful.Accounts.Info>} Detailed account information
     * @throws {Error} If information retrieval fails
     */
    async getRestfulInfo(
        accountId: string,
        limit?: number,
        order?: string,
        timestamp?: string,
        transactionType?: IHashgraph.IRestful.ITransactions.ITransaction.TypeEnum,
        transactions?: boolean
    ): Promise<Hashgraph.Restful.Accounts.Info> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/${accountId}`, {
                params: { limit, order, timestamp, transactionType, transactions }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting detailed account info', error);
            throw error;
        }
    }

    /**
     * Get NFTs for account
     * @method getNftsForAccount
     * @description Retrieves all NFTs owned by the specified account
     * @param {string} accountId - Account ID to get NFTs for
     * @returns {Promise<Hashgraph.Restful.HTS.Nft.Response>} NFT ownership information
     * @throws {Error} If NFT retrieval fails
     */
    async getNftsForAccount(
        accountId: string
    ): Promise<Hashgraph.Restful.HTS.Nft.Response> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/${accountId}/nfts`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting NFTs for account', error);
            throw error;
        }
    }

    /**
     * Get staking rewards for account
     * @method getStakingRewardsForAccount
     * @description Retrieves staking rewards earned by the account
     * @param {string} accountId - Account ID to get rewards for
     * @param {number} limit - Maximum number of items to return
     * @param {string} order - Order of items (asc/desc)
     * @param {string} timestamp - Consensus timestamp for filtering
     * @returns {Promise<Hashgraph.Restful.Staking.Reward.Response>} Staking rewards information
     * @throws {Error} If rewards retrieval fails
     */
    async getStakingRewardsForAccount(
        accountId: string,
        limit?: number,
        order?: string,
        timestamp?: string
    ): Promise<Hashgraph.Restful.Staking.Reward.Response> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/${accountId}/rewards`, {
                params: { limit, order, timestamp }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting staking rewards', error);
            throw error;
        }
    }

    /**
     * Get token relationships for account
     * @method getTokenRelationships
     * @description Retrieves token associations and relationships for the account
     * @param {string} accountId - Account ID to get token relationships for
     * @param {number} limit - Maximum number of items to return
     * @param {string} order - Order of items (asc/desc)
     * @param {string} token - Specific token ID to filter by
     * @returns {Promise<Hashgraph.Restful.HTS.Relationship.Entity>} Token relationships information
     * @throws {Error} If relationship retrieval fails
     */
    async getTokenRelationships(
        accountId: string,
        limit?: number,
        order?: string,
        token?: string
    ): Promise<Hashgraph.Restful.HTS.Relationship.Entity> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/${accountId}/tokens`, {
                params: { limit, order, token }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting token relationships', error);
            throw error;
        }
    }
}