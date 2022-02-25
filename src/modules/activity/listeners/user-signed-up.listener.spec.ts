import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

import { UserSignedUpListener } from "./user-signed-up.listener";

describe("UserSignedUpListener", () => {
  let service: UserSignedUpListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [ActivityCreateOneService, UserSignedUpListener],
    }).compile();

    service = module.get<UserSignedUpListener>(UserSignedUpListener);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
