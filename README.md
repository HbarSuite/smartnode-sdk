# @hsuite/smartnode-sdk

A powerful SDK for interacting with SmartNode services and Hedera Hashgraph network functionality. This SDK provides a comprehensive set of tools and interfaces for managing SmartNode operations, validator interactions, and Hedera Hashgraph services.

## Features

- **SmartNode Operations**: Core functionality for interacting with SmartNode services
- **Validator Management**: Tools for managing and interacting with validators
- **Hedera Hashgraph Integration**:
  - Hashgraph Consensus Service (HCS) operations
  - Account management
  - Transaction handling
  - Token Service (HTS) operations

## Installation

```bash
npm install @hsuite/smartnode-sdk
```

## Module Integration

The SDK is designed to be integrated into NestJS applications using the module system. It provides flexible configuration options through asynchronous initialization.

### Basic Usage

```typescript
import { SmartNodeSdkModule } from '@hsuite/smartnode-sdk';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SmartNodeSdkModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        client: {
          // Your client configuration
        }
      }),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}
```

## Services

### SmartNodeSdkService

The main service that provides access to all SDK functionality. It initializes and manages the following sub-services:

- `smartNodeRestful`: Core SmartNode operations
- `validatorsRestful`: Validator management operations
- `hcsHashgraphRestful`: Hedera Consensus Service operations
- `accountsHashgraphRestful`: Hedera account management
- `transactionsHashgraphRestful`: Transaction handling
- `htsHashgraphRestful`: Hedera Token Service operations

### REST Services

#### Base Restful Service
All REST services extend from a base implementation that provides common functionality for HTTP requests and error handling.

#### Available Services

1. **SmartNode Restful**
   - Core SmartNode operations and management

2. **Validators Restful**
   - Validator management and interaction

3. **HCS (Hashgraph Consensus Service) Restful**
   - Consensus service operations
   - Message submission and retrieval

4. **Accounts Hashgraph Restful**
   - Account creation and management
   - Balance queries
   - Account updates

5. **Transactions Hashgraph Restful**
   - Transaction submission
   - Transaction status queries
   - Transaction history

6. **HTS (Hedera Token Service) Restful**
   - Token creation and management
   - Token transfers
   - Token information queries

## Configuration

The SDK supports flexible configuration through the `SmartNodeSdkModuleAsyncOptions` interface:

```typescript
interface SmartNodeSdkModuleAsyncOptions {
  imports?: Array<any>;
  useExisting?: Array<Type<any>>;
  useClass?: Type<any>;
  useFactory?: (...args: any[]) => Promise<ISdk.IOptions> | ISdk.IOptions;
  inject?: any[];
}
```

### Configuration Options

The SDK can be configured using three different patterns:
1. Using an existing factory
2. Creating a new factory class
3. Using a factory function

## Dependencies

- @nestjs/common
- @hsuite/client

## Version

Current Version: 2.0.0

## License

[License information not found in source code]

---

For more detailed information about specific services and their usage, please refer to the individual service documentation in the source code.

<p align="center">
  Built with ❤️ by the HbarSuite Team<br>
  Copyright © 2024 HbarSuite. All rights reserved.
</p>