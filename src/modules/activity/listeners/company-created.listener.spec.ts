import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

import { CompanyCreatedListener } from "./company-created.listener";

describe("CompanyCreatedListener", () => {
  let service: CompanyCreatedListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [ActivityCreateOneService, CompanyCreatedListener],
    }).compile();

    service = module.get<CompanyCreatedListener>(CompanyCreatedListener);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
