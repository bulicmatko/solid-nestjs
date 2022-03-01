import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { UserSignUpService } from "./user-sign-up.service";

describe("UserSignUpService", () => {
  let service: UserSignUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [UserSignUpService],
    }).compile();

    service = module.get<UserSignUpService>(UserSignUpService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
