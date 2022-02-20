import { Test, TestingModule } from "@nestjs/testing";

import { UserCreateOneService } from "../../services/user-create-one.service";

import { UserSignUpController } from "./user-sign-up.controller";

describe("UserSignUpController", () => {
  let controller: UserSignUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSignUpController],
      providers: [UserCreateOneService],
    }).compile();

    controller = module.get<UserSignUpController>(UserSignUpController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
