import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../../logger/logger.module";
import { PubSubModule } from "../../../pub-sub/pub-sub.module";
import { PrismaModule } from "../../../prisma/prisma.module";

import { UserCreateOneService } from "../../services/user-create-one.service";

import { UserSignUpController } from "./user-sign-up.controller";

describe("UserSignUpController", () => {
  let controller: UserSignUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PubSubModule, PrismaModule],
      controllers: [UserSignUpController],
      providers: [UserCreateOneService],
    }).compile();

    controller = module.get<UserSignUpController>(UserSignUpController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
