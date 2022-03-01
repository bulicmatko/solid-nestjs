import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

import { CompanyCreatedEventListener } from "./company-created-event.listener";

describe("CompanyCreatedEventListener", () => {
  let service: CompanyCreatedEventListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [ActivityCreateOneService, CompanyCreatedEventListener],
    }).compile();

    service = module.get<CompanyCreatedEventListener>(
      CompanyCreatedEventListener,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
