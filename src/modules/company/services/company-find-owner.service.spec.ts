import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from '../../logger/logger.module';
import { PrismaModule } from '../../prisma/prisma.module';

import { CompanyFindOwnerService } from './company-find-owner.service';

describe('CompanyFindOwnerService', () => {
  let service: CompanyFindOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [CompanyFindOwnerService],
    }).compile();

    service = module.get<CompanyFindOwnerService>(CompanyFindOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
