import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { ActivityCreateOneService } from "../services/activity-create-one.service";

import { UserSignedInEventListener } from "./user-signed-in-event.listener";

describe("UserSignedInEventListener", () => {
  let service: UserSignedInEventListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [ActivityCreateOneService, UserSignedInEventListener],
    }).compile();

    service = module.get<UserSignedInEventListener>(UserSignedInEventListener);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
