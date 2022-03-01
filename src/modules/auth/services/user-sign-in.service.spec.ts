import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { UserSignInService } from "./user-sign-in.service";

describe("UserSignInService", () => {
  let service: UserSignInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [UserSignInService],
    }).compile();

    service = module.get<UserSignInService>(UserSignInService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
