import { Test, TestingModule } from "@nestjs/testing";

import { LoggerModule } from "../../logger/logger.module";
import { PrismaModule } from "../../prisma/prisma.module";

import { UserCreateOneService } from "./user-create-one.service";

describe("UserCreateOneService", () => {
  let service: UserCreateOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule, PrismaModule],
      providers: [UserCreateOneService],
    }).compile();

    service = module.get<UserCreateOneService>(UserCreateOneService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
