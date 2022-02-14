import { Test, TestingModule } from '@nestjs/testing';

import { LoggerModule } from '../../../logger/logger.module';
import { PrismaModule } from '../../../prisma/prisma.module';
import { PaginationModule } from '../../../pagination/pagination.module';

import { CompanyFindManyService } from '../../services/company-find-many.service';

import { CompanyFindManyResolver } from './company-find-many.resolver';

describe('CompanyFindManyResolver', () => {
  let resolver: CompanyFindManyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule, PaginationModule],
      providers: [CompanyFindManyResolver, CompanyFindManyService],
    }).compile();

    resolver = module.get<CompanyFindManyResolver>(CompanyFindManyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
