import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from '../../logger/logger.module';
import { PrismaModule } from '../../prisma/prisma.module';

import { CompanyCreateOneService } from './company-create-one.service';

describe('CompanyCreateOneService', () => {
  let service: CompanyCreateOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [CompanyCreateOneService],
    }).compile();

    service = module.get<CompanyCreateOneService>(CompanyCreateOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
