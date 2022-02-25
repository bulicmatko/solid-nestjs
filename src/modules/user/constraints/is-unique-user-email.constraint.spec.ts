import { Test, TestingModule } from "@nestjs/testing";

import { PrismaModule } from "../../prisma/prisma.module";

import { IsUniqueUserEmailConstraint } from "./is-unique-user-email.constraint";

describe("IsUniqueUserEmailConstraint", () => {
  let service: IsUniqueUserEmailConstraint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [IsUniqueUserEmailConstraint],
    }).compile();

    service = module.get<IsUniqueUserEmailConstraint>(
      IsUniqueUserEmailConstraint,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
