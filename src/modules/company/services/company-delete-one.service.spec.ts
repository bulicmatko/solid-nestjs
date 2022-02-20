import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { AuthModule } from "../..//auth/auth.module";

import { CompanyDeleteOneService } from "./company-delete-one.service";

describe("CompanyDeleteOneService", () => {
  let service: CompanyDeleteOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule, AuthModule],
      providers: [CompanyDeleteOneService],
    }).compile();

    service = module.get<CompanyDeleteOneService>(CompanyDeleteOneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
