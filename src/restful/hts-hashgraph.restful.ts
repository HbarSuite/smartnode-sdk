// libs/smartnode-sdk/src/restful/hts-hashgraph.restful.ts

import { ClientService } from '@hsuite/client';
import { BaseRestful } from './base.restful';
import { Inject } from '@nestjs/common';
import { TokenInfo, TokenNftInfo } from '@hashgraph/sdk';
import { Hashgraph, IHashgraph } from '@hsuite/hashgraph-types';

/**
 * @file hts-hashgraph.restful.ts
 * @class HtsHashgraphRestful
 * @extends BaseRestful
 * @description Restful service for managing Hashgraph Token Service (HTS) operations.
 * Provides methods for:
 * - Creating and updating tokens
 * - Managing token fees and properties
 * - Minting and burning tokens
 * - Freezing/unfreezing token transfers
 * - Managing KYC status
 * - Querying token information
 * @category Services
 * @subcategory Restful
 * @since 2.0.0
 */
export class HtsHashgraphRestful extends BaseRestful {
    /**
     * Creates an instance of HtsHashgraphRestful
     * @constructor
     * @param {any} sdkOptions - Configuration options for initializing the SDK
     * @param {ClientService} client - Client service instance for making API requests
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    constructor(
        @Inject('sdkOptions') private readonly sdkOptions: any,
        protected readonly client: ClientService
    ) {
        super(client, 'hts');
    }

    /**
     * Creates a new token on the Hashgraph network
     * @method createToken
     * @description Creates a new token with specified properties including:
     * - Token name and symbol
     * - Initial supply and decimals
     * - Treasury account
     * - Admin and other key settings
     * - Custom fees if applicable
     * @param {IHashgraph.ILedger.IHTS.ICreate} params - Token creation parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the token creation
     * @throws {Error} If token creation fails
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    async createToken(
        params: IHashgraph.ILedger.IHTS.ICreate
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/create/token`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error creating token', error);
            throw error;
        }
    }

    /**
     * Updates properties of an existing token
     * @method updateToken
     * @description Modifies token properties including:
     * - Token name and symbol
     * - Admin key settings
     * - Auto-renew settings
     * - Expiry and other metadata
     * @param {string} tokenId - ID of the token to update
     * @param {IHashgraph.ILedger.IHTS.IUpdate} params - Token update parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the token update
     * @throws {Error} If token update fails
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    async updateToken(
        tokenId: string,
        params: IHashgraph.ILedger.IHTS.IUpdate
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.patch(`${this.basePath}/update/${tokenId}`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error updating token', error);
            throw error;
        }
    }

    /**
     * Updates custom fees for a token
     * @method updateTokenFees
     * @description Modifies the fee schedule for a token including:
     * - Fixed fees in HBAR or tokens
     * - Fractional fees
     * - Royalty fees for NFTs
     * @param {string} tokenId - ID of the token to update fees for
     * @param {IHashgraph.ILedger.IHTS.IUpdateFees} params - Fee update parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the fee update
     * @throws {Error} If fee update fails
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    async updateTokenFees(
        tokenId: string,
        params: IHashgraph.ILedger.IHTS.IUpdateFees
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.patch(`${this.basePath}/update/${tokenId}/fees`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error updating token fees', error);
            throw error;
        }
    }

    /**
     * Mints new NFTs
     * @method mintNftToken
     * @description Mints new NFTs with specified metadata
     * @param {IHashgraph.ILedger.IHTS.INft.IMint} params - NFT minting parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the NFT minting
     * @throws {Error} If NFT minting fails
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    async mintNftToken(
        params: IHashgraph.ILedger.IHTS.INft.IMint
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/mint/nft`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error minting NFT token', error);
            throw error;
        }
    }

    /**
     * Wipes an NFT from an account
     * @method wipeNftToken
     * @description Removes an NFT from an account:
     * - Deletes NFT ownership
     * - Reduces total supply
     * - Cannot wipe treasury account
     * @param {IHashgraph.ILedger.IHTS.INft.IWipe} params - NFT wipe parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the NFT wipe
     * @throws {Error} If NFT wipe fails
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    async wipeNftToken(
        params: IHashgraph.ILedger.IHTS.INft.IWipe
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/wipe/nft`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error wiping NFT token', error);
            throw error;
        }
    }

    /**
     * Burns an NFT
     * @method burnNftToken
     * @description Permanently removes an NFT from circulation
     * @param {IHashgraph.ILedger.IHTS.INft.IBurn} params - NFT burn parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the NFT burn
     * @throws {Error} If NFT burn fails
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    async burnNftToken(
        params: IHashgraph.ILedger.IHTS.INft.IBurn
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/burn/nft`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error burning NFT token', error);
            throw error;
        }
    }

    /**
     * Gets token information
     * @method getTokenInfo
     * @description Retrieves detailed information about a specific token
     * @param {string} tokenId - ID of the token to query
     * @returns {Promise<TokenInfo>} Token information
     * @throws {Error} If token info retrieval fails
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    async getTokenInfo(tokenId: string): Promise<TokenInfo> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/token/${tokenId}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting token info', error);
            throw error;
        }
    }

    /**
     * Gets NFT information
     * @method getNftInfo
     * @description Retrieves detailed information about a specific NFT
     * @param {string} tokenId - ID of the token
     * @param {number} serialNumber - Serial number of the NFT
     * @returns {Promise<TokenNftInfo[]>} NFT information array
     * @throws {Error} If NFT info retrieval fails
     * @memberof HtsHashgraphRestful
     * @since 2.0.0
     */
    async getNftInfo(tokenId: string, serialNumber: number): Promise<TokenNftInfo[]> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/nft/${tokenId}/${serialNumber}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting NFT info', error);
            throw error;
        }
    }

    /**
     * Get token information with optional timestamp
     * @method getRestfulTokenInfo
     * @description Retrieves comprehensive token information including properties, supply, treasury, and fees
     * @param {string} tokenId - Token ID to get information for
     * @param {string} timestamp - Optional timestamp for historical data
     * @returns {Promise<Hashgraph.Restful.HTS.Info.Entity>} Token information
     * @throws {Error} If token info retrieval fails
     */
    async getRestfulTokenInfo(
        tokenId: string,
        timestamp?: string
    ): Promise<Hashgraph.Restful.HTS.Info.Entity> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/tokens/${tokenId}`, {
                params: { timestamp }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting token info', error);
            throw error;
        }
    }

    /**
     * Get token balances with filters
     * @method getTokenBalances
     * @description Retrieves token balance information with optional filtering
     * @param {string} tokenId - Token ID to get balances for
     * @param {number} accountBalance - Filter by balance amount
     * @param {string} accountId - Filter by account ID
     * @param {string} accountPublicKey - Filter by account public key
     * @param {number} limit - Maximum number of results
     * @param {string} order - Sort order
     * @param {string} timestamp - Historical timestamp
     * @returns {Promise<Hashgraph.Restful.HTS.Balance.Response>} Token balances
     * @throws {Error} If balance retrieval fails
     */
    async getTokenBalances(
        tokenId: string,
        accountBalance?: number,
        accountId?: string,
        accountPublicKey?: string,
        limit?: number,
        order?: string,
        timestamp?: string
    ): Promise<Hashgraph.Restful.HTS.Balance.Response> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/tokens/${tokenId}/balances`, {
                params: { accountBalance, accountId, accountPublicKey, limit, order, timestamp }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting token balances', error);
            throw error;
        }
    }

    /**
     * Get NFTs for token with filters
     * @method getTokenNfts
     * @description Retrieves NFT information for a token with optional filtering
     * @param {string} tokenId - Token ID to get NFTs for
     * @param {string} accountId - Filter by owner account
     * @param {number} limit - Maximum number of results
     * @param {string} order - Sort order
     * @param {number} serialNumber - Filter by serial number
     * @returns {Promise<Hashgraph.Restful.HTS.Nft.Response>} NFT information
     * @throws {Error} If NFT retrieval fails
     */
    async getTokenNfts(
        tokenId: string,
        accountId?: string,
        limit?: number,
        order?: string,
        serialNumber?: number
    ): Promise<Hashgraph.Restful.HTS.Nft.Response> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/tokens/${tokenId}/nfts`, {
                params: { accountId, limit, order, serialNumber }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting token NFTs', error);
            throw error;
        }
    }

    /**
     * Get specific NFT by serial number
     * @method getTokenNftBySerialNumber
     * @description Retrieves detailed information about a specific NFT
     * @param {string} tokenId - Token ID the NFT belongs to
     * @param {number} serialNumber - Serial number of the NFT
     * @returns {Promise<Hashgraph.Restful.HTS.Nft.Response>} NFT information
     * @throws {Error} If NFT retrieval fails
     */
    async getTokenNftBySerialNumber(
        tokenId: string,
        serialNumber: number
    ): Promise<Hashgraph.Restful.HTS.Nft.Response> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/tokens/${tokenId}/nfts/${serialNumber}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting NFT by serial number', error);
            throw error;
        }
    }

    /**
     * Get NFT transaction history
     * @method getTokenNftTransactionHistory
     * @description Retrieves transaction history for NFTs
     * @param {string} tokenId - Token ID to get history for
     * @param {number} serialNumber - NFT serial number
     * @param {number} limit - Maximum number of results
     * @param {string} order - Sort order
     * @param {string} timestamp - Historical timestamp
     * @returns {Promise<Hashgraph.Restful.Transactions.Transfer.Nft>} NFT transaction history
     * @throws {Error} If history retrieval fails
     */
    async getTokenNftTransactionHistory(
        tokenId: string,
        serialNumber: number,
        limit?: number,
        order?: string,
        timestamp?: string
    ): Promise<Hashgraph.Restful.Transactions.Transfer.Nft> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/tokens/${tokenId}/nfts/transactions`, {
                params: { serialNumber, limit, order, timestamp }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting NFT transaction history', error);
            throw error;
        }
    }    
}