import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

import { UserSignedUpEventListener } from "./user-signed-up-event.listener";

describe("UserSignedUpEventListener", () => {
  let service: UserSignedUpEventListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [ActivityCreateOneService, UserSignedUpEventListener],
    }).compile();

    service = module.get<UserSignedUpEventListener>(UserSignedUpEventListener);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
