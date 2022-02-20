import { Test, TestingModule } from "@nestjs/testing";

import { PrismaModule } from "../../prisma/prisma.module";

import { IsUniqueCompanyNameConstraint } from "./is-unique-company-name.constraint";

describe("IsUniqueCompanyNameConstraint", () => {
  let service: IsUniqueCompanyNameConstraint;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [IsUniqueCompanyNameConstraint],
    }).compile();

    service = module.get<IsUniqueCompanyNameConstraint>(
      IsUniqueCompanyNameConstraint,
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
