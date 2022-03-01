import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

import { CompanyUpdatedEventListener } from "./company-updated-event.listener";

describe("CompanyUpdatedEventListener", () => {
  let service: CompanyUpdatedEventListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [ActivityCreateOneService, CompanyUpdatedEventListener],
    }).compile();

    service = module.get<CompanyUpdatedEventListener>(
      CompanyUpdatedEventListener,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
