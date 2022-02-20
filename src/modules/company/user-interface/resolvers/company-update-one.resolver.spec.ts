import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../../logger/logger.module";
import { PubSubModule } from "../../../pub-sub/pub-sub.module";
import { PrismaModule } from "../../../prisma/prisma.module";

import { CompanyUpdateOneService } from "../../services/company-update-one.service";

import { CompanyUpdateOneResolver } from "./company-update-one.resolver";

describe("CompanyUpdateOneResolver", () => {
  let resolver: CompanyUpdateOneResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PubSubModule, PrismaModule],
      providers: [CompanyUpdateOneResolver, CompanyUpdateOneService],
    }).compile();

    resolver = module.get<CompanyUpdateOneResolver>(CompanyUpdateOneResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
