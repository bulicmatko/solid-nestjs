import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../../logger/logger.module";
import { PubSubModule } from "../../../pub-sub/pub-sub.module";
import { PrismaModule } from "../../../prisma/prisma.module";

import { CompanyDeleteOneService } from "../../services/company-delete-one.service";

import { CompanyDeleteOneResolver } from "./company-delete-one.resolver";

describe("CompanyDeleteOneResolver", () => {
  let resolver: CompanyDeleteOneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PubSubModule, PrismaModule],
      providers: [CompanyDeleteOneResolver, CompanyDeleteOneService],
    }).compile();

    resolver = module.get<CompanyDeleteOneResolver>(CompanyDeleteOneResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
