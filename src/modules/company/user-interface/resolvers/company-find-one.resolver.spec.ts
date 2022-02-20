import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../../logger/logger.module";
import { PrismaModule } from "../../../prisma/prisma.module";
import { AuthModule } from "../../../auth/auth.module";

import { CompanyFindOneService } from "../../services/company-find-one.service";

import { CompanyFindOneResolver } from "./company-find-one.resolver";

describe("CompanyFindOneResolver", () => {
  let resolver: CompanyFindOneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule, AuthModule],
      providers: [CompanyFindOneResolver, CompanyFindOneService],
    }).compile();

    resolver = module.get<CompanyFindOneResolver>(CompanyFindOneResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
