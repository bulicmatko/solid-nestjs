import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { AuthModule } from "../../auth/auth.module";

import { CompanyUpdateOneService } from "./company-update-one.service";

describe("CompanyUpdateOneService", () => {
  let service: CompanyUpdateOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule, AuthModule],
      providers: [CompanyUpdateOneService],
    }).compile();

    service = module.get<CompanyUpdateOneService>(CompanyUpdateOneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
