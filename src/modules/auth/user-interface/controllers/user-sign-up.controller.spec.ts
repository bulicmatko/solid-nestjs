import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { LoggerModule } from "../../../logger/logger.module";
import { PubSubModule } from "../../../pub-sub/pub-sub.module";
import { PrismaModule } from "../../../prisma/prisma.module";

import { UserSignUpService } from "../../services/user-sign-up.service";

import { UserSignUpController } from "./user-sign-up.controller";

describe("UserSignUpController", () => {
  let controller: UserSignUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        LoggerModule,
        PubSubModule,
        PrismaModule,
      ],
      controllers: [UserSignUpController],
      providers: [UserSignUpService],
    }).compile();

    controller = module.get<UserSignUpController>(UserSignUpController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
