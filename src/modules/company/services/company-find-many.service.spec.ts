import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { AuthModule } from "../../auth/auth.module";
import { PaginationModule } from "../../pagination/pagination.module";

import { CompanyFindManyService } from "./company-find-many.service";

describe("CompanyFindManyService", () => {
  let service: CompanyFindManyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule, AuthModule, PaginationModule],
      providers: [CompanyFindManyService],
    }).compile();

    service = module.get<CompanyFindManyService>(CompanyFindManyService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
