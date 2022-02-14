import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from '../../logger/logger.module';
import { PrismaModule } from '../../prisma/prisma.module';

import { CompanyRecoverOneService } from './company-recover-one.service';

describe('CompanyRecoverOneService', () => {
  let service: CompanyRecoverOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [CompanyRecoverOneService],
    }).compile();

    service = module.get<CompanyRecoverOneService>(CompanyRecoverOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
