import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from '../../../logger/logger.module';
import { PubSubModule } from '../../../pub-sub/pub-sub.module';
import { PrismaModule } from '../../../prisma/prisma.module';

import { CompanyCreateOneService } from '../../services/company-create-one.service';

import { CompanyCreateOneResolver } from './company-create-one.resolver';

describe('CompanyCreateOneResolver', () => {
  let resolver: CompanyCreateOneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PubSubModule, PrismaModule],
      providers: [CompanyCreateOneResolver, CompanyCreateOneService],
    }).compile();

    resolver = module.get<CompanyCreateOneResolver>(CompanyCreateOneResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});