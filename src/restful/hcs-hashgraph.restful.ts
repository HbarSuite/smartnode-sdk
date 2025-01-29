// libs/smartnode-sdk/src/restful/hcs-hashgraph.restful.ts

import { ClientService } from '@hsuite/client';
import { BaseRestful } from './base.restful';
import { Inject } from '@nestjs/common';
import { SubscriptionHandle } from '@hashgraph/sdk';
import { Hashgraph, IHashgraph } from '@hsuite/hashgraph-types';

/**
 * @file hcs-hashgraph.restful.ts
 * @class HcsHashgraphRestful
 * @extends BaseRestful
 * @description Restful service for interacting with the Hashgraph Consensus Service (HCS).
 * Provides methods for:
 * - Creating, updating and deleting topics
 * - Submitting messages to topics
 * - Retrieving topic information and messages
 * - Managing topic subscriptions
 * @category Services
 * @subcategory Restful
 * @since 2.0.0
 */
export class HcsHashgraphRestful extends BaseRestful {
    /**
     * Creates an instance of HcsHashgraphRestful
     * @constructor
     * @param {any} sdkOptions - Configuration options for initializing the SDK
     * @param {ClientService} client - Client service instance for making API requests
     * @memberof HcsHashgraphRestful
     * @since 2.0.0
     */
    constructor(
        @Inject('sdkOptions') private readonly sdkOptions: any,
        protected readonly client: ClientService
    ) {
        super(client, 'hcs');
    }

    /**
     * Creates a new topic on Hashgraph Consensus Service
     * @method createTopic
     * @description Creates a new topic that can be used for submitting messages and creating
     * decentralized pub-sub channels. Topics are the foundation for HCS messaging.
     * @param {IHashgraph.ILedger.IHCS.ITopic.ICreate} params - Topic creation parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the topic creation
     * @throws {Error} If topic creation fails
     * @memberof HcsHashgraphRestful
     * @since 2.0.0
     */
    async createTopic(
        params: IHashgraph.ILedger.IHCS.ITopic.ICreate
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(this.basePath, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error creating topic', error);
            throw error;
        }
    }

    /**
     * Updates an existing topic on Hashgraph Consensus Service
     * @method updateTopic
     * @description Updates the properties of an existing topic. Currently only supports
     * updating the topic's memo field to maintain security and prevent misuse.
     * @param {string} topicId - ID of the topic to update
     * @param {IHashgraph.ILedger.IHCS.ITopic.IUpdate} params - Topic update parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the topic update
     * @throws {Error} If topic update fails
     * @memberof HcsHashgraphRestful
     * @since 2.0.0
     */
    async updateTopic(
        topicId: string,
        params: IHashgraph.ILedger.IHCS.ITopic.IUpdate
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.put(`${this.basePath}/${topicId}`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error updating topic', error);
            throw error;
        }
    }

    /**
     * Deletes a topic from Hashgraph Consensus Service
     * @method deleteTopic
     * @description Permanently deletes a topic from HCS. Once deleted, no new messages can be
     * submitted to the topic. Existing messages remain accessible through mirror nodes.
     * @param {string} topicId - ID of the topic to delete
     * @param {IHashgraph.ILedger.IHCS.ITopic.IDelete} params - Topic deletion parameters
     * @returns {Promise<Uint8Array>} Transaction bytes for the topic deletion
     * @throws {Error} If topic deletion fails
     * @memberof HcsHashgraphRestful
     * @since 2.0.0
     */
    async deleteTopic(
        topicId: string,
        params: IHashgraph.ILedger.IHCS.ITopic.IDelete
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.delete(`${this.basePath}/${topicId}`, { data: params });
            return response.data;
        } catch (error) {
            this.logger.error('Error deleting topic', error);
            throw error;
        }
    }

    /**
     * Retrieves information about a specific HCS topic
     * @method getTopicInfo
     * @description Gets detailed information about a topic including its current state,
     * associated accounts, and metadata. Useful for verifying topic status and permissions.
     * @param {string} topicId - ID of the topic to get information for
     * @returns {Promise<Hashgraph.Ledger.HCS.Topic.Info>} Topic information and metadata
     * @throws {Error} If fetching topic information fails
     * @memberof HcsHashgraphRestful
     * @since 2.0.0
     */
    async getTopicInfo(topicId: string): Promise<Hashgraph.Ledger.HCS.Topic.Info> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/${topicId}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting topic info', error);
            throw error;
        }
    }

    /**
     * Submits a message to a specific HCS topic
     * @method submitMessage
     * @description Submits a new message to a topic. Messages become part of the topic's
     * immutable sequence and can include optional signatures and sender IDs for verification purposes.
     * @param {string} topicId - ID of the topic to submit message to
     * @param {IHashgraph.ILedger.IHCS.ITopic.IMessage.ISubmit} params - Message content and metadata
     * @returns {Promise<Uint8Array>} Transaction bytes for the message submission
     * @throws {Error} If message submission fails
     * @memberof HcsHashgraphRestful
     * @since 2.0.0
     */
    async submitMessage(
        topicId: string,
        params: IHashgraph.ILedger.IHCS.ITopic.IMessage.ISubmit
    ): Promise<Uint8Array> {
        try {
            const response = await this.client.axios.post(`${this.basePath}/${topicId}/message`, params);
            return response.data;
        } catch (error) {
            this.logger.error('Error submitting message', error);
            throw error;
        }
    }

    /**
     * Retrieves messages from a specific HCS topic
     * @method getMessages
     * @description Gets messages from a topic with optional filtering parameters. Supports
     * pagination and time-based filtering. Returns a subscription handle for managing the message stream.
     * @param {string} topicId - ID of the topic to get messages from
     * @param {Hashgraph.Ledger.HCS.Topic.Message.Info} params - Filter and pagination parameters
     * @returns {Promise<SubscriptionHandle>} Subscription handle for message stream
     * @throws {Error} If message retrieval fails
     * @memberof HcsHashgraphRestful
     * @since 2.0.0
     */
    async getMessages(
        topicId: string,
        params: Hashgraph.Ledger.HCS.Topic.Message.Info
    ): Promise<SubscriptionHandle> {
        try {
            const response = await this.client.axios.get(`${this.basePath}/${topicId}/messages`, { params });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting messages', error);
            throw error;
        }
    }

    /**
     * Get messages from topic with filters
     * @method getRestfulMessages
     * @description Retrieves messages from a topic with optional filtering and pagination
     * @param {string} topicId - Topic ID to get messages from
     * @param {string} encoding - Message encoding format
     * @param {number} limit - Maximum number of messages
     * @param {string} order - Sort order (asc/desc)
     * @param {number} sequenceNumber - Starting sequence number
     * @param {string} timestamp - Starting timestamp
     * @returns {Promise<Array<Hashgraph.Restful.HCS.Message.Entity>>} Array of messages
     * @throws {Error} If message retrieval fails
     */
    async getRestfulMessages(
        topicId: string,
        encoding?: string,
        limit?: number,
        order?: string,
        sequenceNumber?: number,
        timestamp?: string
    ): Promise<Array<Hashgraph.Restful.HCS.Message.Entity>> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/topics/${topicId}/messages`, {
                params: { encoding, limit, order, sequenceNumber, timestamp }
            });
            return response.data;
        } catch (error) {
            this.logger.error('Error getting messages', error);
            throw error;
        }
    }

    /**
     * Get specific message by sequence number
     * @method getMessageByIdAndSequenceNumber
     * @description Retrieves a specific message using topic ID and sequence number
     * @param {string} topicId - Topic ID containing the message
     * @param {number} sequenceNumber - Sequence number of the message
     * @returns {Promise<Hashgraph.Restful.HCS.Message.Entity>} Message entity
     * @throws {Error} If message retrieval fails
     */
    async getMessageByIdAndSequenceNumber(
        topicId: string,
        sequenceNumber: number
    ): Promise<Hashgraph.Restful.HCS.Message.Entity> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/topics/${topicId}/messages/${sequenceNumber}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting message by sequence', error);
            throw error;
        }
    }

    /**
     * Get message by timestamp
     * @method getMessageByTimestamp
     * @description Retrieves a message from any topic at a specific timestamp
     * @param {string} timestamp - ISO 8601 timestamp to search for
     * @returns {Promise<Hashgraph.Restful.HCS.Topic.Status>} Topic status with message
     * @throws {Error} If message retrieval fails
     */
    async getMessageByTimestamp(
        timestamp: string
    ): Promise<Hashgraph.Restful.HCS.Topic.Status> {
        try {
            const response = await this.client.axios.get(`mirrors/${this.basePath}/topics/messages/${timestamp}`);
            return response.data;
        } catch (error) {
            this.logger.error('Error getting message by timestamp', error);
            throw error;
        }
    }    
}