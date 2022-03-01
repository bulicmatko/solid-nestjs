import { Test, TestingModule } from "@nestjs/testing";

import { PrismaModule } from "../../prisma/prisma.module";

import { IsExistingUserEmailConstraint } from "./is-existing-user-email.constraint";

describe("IsExistingUserEmailConstraint", () => {
  let service: IsExistingUserEmailConstraint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [IsExistingUserEmailConstraint],
    }).compile();

    service = module.get<IsExistingUserEmailConstraint>(
      IsExistingUserEmailConstraint,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
