/**
 * @module SmartNodeSdk
 * @description
 * Test suite for the SmartNodeSdkService class.
 * Verifies the basic functionality and initialization of the service.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { SmartNodeSdkService } from './smartnode-sdk.service';

/**
 * Test suite for SmartNodeSdkService
 * 
 * @description
 * Contains test cases to verify:
 * - Service instantiation
 * - Basic service functionality
 */
describe('SmartNodeSdkService', () => {
  let service: SmartNodeSdkService;

  /**
   * Test setup
   * 
   * @description
   * Creates a test module and instantiates the SmartNodeSdkService
   * before each test case.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartNodeSdkService],
    }).compile();

    service = module.get<SmartNodeSdkService>(SmartNodeSdkService);
  });

  /**
   * Basic service instantiation test
   * 
   * @description
   * Verifies that the service is properly instantiated and defined
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
