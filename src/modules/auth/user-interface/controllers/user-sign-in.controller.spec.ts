import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { LoggerModule } from "../../../logger/logger.module";
import { PubSubModule } from "../../../pub-sub/pub-sub.module";
import { PrismaModule } from "../../../prisma/prisma.module";

import { UserSignInService } from "../../services/user-sign-in.service";

import { UserSignInController } from "./user-sign-in.controller";

describe("UserSignInController", () => {
  let controller: UserSignInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        LoggerModule,
        PubSubModule,
        PrismaModule,
      ],
      controllers: [UserSignInController],
      providers: [UserSignInService],
    }).compile();

    controller = module.get<UserSignInController>(UserSignInController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
