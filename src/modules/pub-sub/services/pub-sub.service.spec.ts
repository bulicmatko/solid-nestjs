import { Test, TestingModule } from '@nestjs/testing';

import { PubSubConfigModule } from '../config/pub-sub-config.module';

import { PubSubService } from './pub-sub.service';

describe('PubSubService', () => {
  let service: PubSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PubSubConfigModule],
      providers: [PubSubService],
    }).compile();

    service = module.get<PubSubService>(PubSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
