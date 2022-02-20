import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../../logger/logger.module";
import { PrismaModule } from "../../../prisma/prisma.module";

import { CompanyFindOwnerService } from "../../services/company-find-owner.service";

import { CompanyResolver } from "./company.resolver";

describe("CompanyResolver", () => {
  let resolver: CompanyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [CompanyResolver, CompanyFindOwnerService],
    }).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
