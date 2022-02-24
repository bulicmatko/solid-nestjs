import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { CompanyCreatedListener } from "./company-created.listener";

describe("CompanyCreatedListener", () => {
  let service: CompanyCreatedListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [CompanyCreatedListener],
    }).compile();

    service = module.get<CompanyCreatedListener>(CompanyCreatedListener);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
