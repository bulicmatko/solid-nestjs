import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { ActivityCreateOneService } from "./activity-create-one.service";

describe("ActivityCreateOneService", () => {
  let service: ActivityCreateOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [ActivityCreateOneService],
    }).compile();

    service = module.get<ActivityCreateOneService>(ActivityCreateOneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
