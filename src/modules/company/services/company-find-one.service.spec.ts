import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { CompanyFindOneService } from "./company-find-one.service";

describe("CompanyFindOneService", () => {
  let service: CompanyFindOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [CompanyFindOneService],
    }).compile();

    service = module.get<CompanyFindOneService>(CompanyFindOneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
